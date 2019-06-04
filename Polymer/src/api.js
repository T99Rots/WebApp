export const APIError = class extends Error {
  constructor(httpCode, message) {
    super(message);
    if(
      typeof httpCode == 'number'
      &&httpCode >= 400
      &&httpCode <= 599
    ) {
      this.httpCode = httpCode;
    }
  }
}

const createAPI = ({
  url = location.origin,
  headers
} = {}) => {
  const createProxy = (basePath = []) => {
    return new Proxy(async () => {},{
      get: (target,property) => {
        if(!(property in target)) target[property] = createProxy([...basePath, property]);
        return target[property];      
      },
      apply: (target,thisArg,argArray) => {
        const requestUrl = (
          url.replace(/\/*$/, '') + '/' + 
          basePath.map(pathPart => encodeURIComponent(pathPart)).join('/')
        );
        return fetch(requestUrl, {
          method: 'POST',
          headers: {
            ...headers,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(argArray)
        }).then(async res => {
          if(res.status === 204) {
            return;
          } else if (res.status > 199 && res.status < 400) {
            return res.json();
          } else if(res.status === 404) {
            throw new TypeError(`api.${basePath.join('.')} does not exist`)
          } else {
            throw new APIError(res.status, await res.text() || res.statusText)
          }
        })
      },
      has: () => true,
      set: () => {}
    })
  }
  return createProxy();
}

export const api = createAPI({
  url: `${location.protocol}//${location.hostname}:8391`
});