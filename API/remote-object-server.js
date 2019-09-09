const WebSocket = require('ws');

exports.Router = class {
  constructor(api, options) {
    const wss = new WebSocket.Server(options);

    const connections = [];

    wss.on('listening', () => {
      if(options.port) console.log('listening on port ' + options.port)
    })

    wss.on('connection', ws => {
      console.log('new connection', ws);
      const connection = {
        ws
      }

      const sendError = (message) => {
        ws.send(JSON.stringify({
          error: message
        }))
      }

      connections.push(connection)
      
      ws.on('message', async message => {
        console.log(message);
        let messageObj = { reqId: null };
        try {
          try {
            messageObj = JSON.parse(message)
          } catch {
            throw new APIError('Invalid message')
          }
  
          if('keyPath' in messageObj) {
            if(!Array.isArray(messageObj.keyPath)) {
              throw new APIError('keyPath has to be a array');
            }
          } else {
            throw new APIError('keyPath is missing from request object');
          } 
  
          const resolveApiFunction = (pathParts, api) => {
            if(pathParts.length > 1) {
              if(typeof api[pathParts[0]] == 'object') {
                return resolveApiFunction(pathParts.slice(1),api[pathParts[0]]);
              } else {
                throw new APIError(`api.${pathParts.join('.')} does not exist`);
              }
            } else {
              if(typeof api[pathParts[0]] == 'function') {
                return api[pathParts[0]];
              } else {
                throw new APIError(`api.${pathParts.join('.')} does not exist`);
              }
            }
          }
  
          const apiFunction = resolveApiFunction(messageObj.keyPath, api);

          let apiFunctionRes = await apiFunction(...messageObj.args);
          if (typeof apiFunctionRes == 'function') {
            apiFunctionRes = await apiFunctionRes(connection);
          }
          ws.send(JSON.stringify({
            type: 'response',
            data: apiFunctionRes,
            resId: messageObj.reqId
          }))
        } catch(err) {
          if(err instanceof exports.APIError && err.expose) {
            console.warn(err);
            ws.send(JSON.stringify({
              type: 'error',
              data: err.message,
              resId: messageObj.reqId
            }))
          } else {
            console.error(err);
            ws.send(JSON.stringify({
              type: 'error',
              data: 'Internal server error',
              resId: messageObj.reqId
            }))
          }
        }
      })

      ws.on('close', () => {
        const index = connections.indexOf(connection);
        connections.splice(index, 1);
      })
    })
  }
}

const APIError = class extends Error {
  constructor(message) {
    super(message);
    this.expose = true;
  }
}

exports.APIError = APIError;

