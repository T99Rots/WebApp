exports.router = (api) =>  async (ctx, next) => {
  if(ctx.request.type !== 'application/json') ctx.throw(400);
  if(!Array.isArray(ctx.request.body)) ctx.throw(400);
  const pathParts = ctx.request.url.split('/').filter(p => p.length > 0);
  const resolveApiFunction = (pathParts, api) => {
    if(pathParts.length > 1) {
      if(typeof api[pathParts[0]] == 'object') {
        return resolveApiFunction(pathParts.slice(1),api[pathParts[0]]);
      } else {
        ctx.throw(404);
      }
    } else {
      if(typeof api[pathParts[0]] == 'function') {
        return api[pathParts[0]];
      } else {
        ctx.throw(404);
      }
    }
  }
  const apiFunction = resolveApiFunction(pathParts, api);
  try {
    let apiFunctionRes = await apiFunction(...ctx.request.body);
    if (typeof apiFunctionRes == 'function') {
      apiFunctionRes = await apiFunctionRes(ctx);
    }
    ctx.body = JSON.stringify(apiFunctionRes);
  } catch (err) {
    if(err instanceof exports.APIError && err.expose) {
      ctx.body = err.message;
      ctx.status = err.httpCode;
      console.warn(err);
    } else {
      ctx.status = 500;
      console.error(err);
    }
  }
  await next();
}

exports.APIError = class extends Error {
  constructor(httpCode, message) {
    super(message);
    if(
      typeof httpCode == 'number'
      &&httpCode >= 400
      &&httpCode <= 599
    ) {
      this.httpCode = httpCode;
    }
    this.expose = true;
  }
}

