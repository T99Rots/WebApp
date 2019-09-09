export const APIError = class extends Error {
  constructor(message) {
    super(message);
  }
}

const createDeepFunctionHandler = (callback) => {
  const proxyCache = new WeakMap();
  const asyncFunction = async () => {};
  const createProxy = (keyPath = []) => new Proxy(asyncFunction, {
    get: (target, property, proxy) => {
      if(typeof property === 'symbol') return;
      let childProxies = proxyCache.get(proxy);
      if(!childProxies) {
        childProxies = {};
        proxyCache.set(proxy, childProxies);
      }
      if(!childProxies[property]) {
        childProxies[property] = createProxy([...keyPath, property]);
      }
      return childProxies[property];
    },
    apply: (target, thisArg, argumentsList) => {
      if(typeof keyPath[keyPath.length-1] !== 'symbol') {
        return callback(keyPath, argumentsList);
      }
    },
    has: () => true,
    set: () => {}
  });
  return createProxy();
}

export const createAPI = (url, callback) => {
  let ws;
  let reqId = 0;
  let wsListeners = [];
  let responseListeners = {};

  const connect = () => {
    try {
      const newWs = new WebSocket(url);

      const responseHandler = (e) => {
        let messageObj;
        try {
          messageObj = JSON.parse(e.data);
        } catch(err) {
          throw new Error('Received non json response from server');
        }
        if(!('resId' in messageObj)) throw new Error('Received response without response id from server');
        responseListeners[messageObj.resId](messageObj);
        delete responseListeners[messageObj.resId];
      }

      newWs.addEventListener('message', responseHandler);

      newWs.addEventListener('close', () => {
        newWs.removeEventListener('message', responseHandler);
        ws = null;
        
        for(const listener of Object.values(responseListeners)) {
          listener({
            type: 'error',
            data: 'Connection closed'
          })
        }
        
        responseListeners = [];
        setTimeout(connect, 5000);
      }, {once: true});

      newWs.addEventListener('open', async () => {
        if(callback) await callback(createDeepFunctionHandler(async (keyPath, args) => {
          const res = await sendMessage({
            keyPath,
            args
          }, newWs);
          if('data' in res) return res.data;
        }))
        for(let listener of wsListeners) {
          listener.resolve(newWs);
        }
        ws = newWs;
        
        wsListeners = [];
      }, {once: true});
    } catch (err) {
      for(let listener of wsListeners) {
        listener.reject('Can\'t connect to server');
      }

      wsListeners = [];

      setTimeout(connect, 5e3);
    }
  }

  connect()

  const getWs = async () => {
    if(ws) {
      return ws
    } else {
      return new Promise((resolve, reject) => wsListeners.push({resolve, reject}));
    }
  }

  const sendMessage = async (obj, ws) => {
    if(!ws) ws = await getWs();
    return new Promise((resolve, reject) => {
      reqId++;
      responseListeners[reqId] = (obj) => {
        if(obj.type === 'error') {
          reject(obj.data);
        } else {
          resolve(obj);
        }
      }
      ws.send(JSON.stringify({
        ...obj,
        reqId
      }));
    });
  }

  return createDeepFunctionHandler(async (keyPath, args) => {
    const res = await sendMessage({
      keyPath,
      args
    });
    if('data' in res) return res.data;
  });
}
