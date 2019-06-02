const path = require('path');

const cleanUrl = url => ('/' + url).replace(/\/+/g, '/').replace(/\/$/, '');

module.exports = (routes, userHandler) => {
  const handleRequest = (callback) => async (ctx) => {
    if(!Array.isArray(ctx.request.body)) ctx.throw(400);
    const user = await userHandler(ctx);
    await callback({
      user,
      ctx
    })(...ctx.request.body);
  }

  const getRoutes = (obj, objPath = [], basePath = '') => {
    let resolvedRoutes = {};
    for(const [key, val] of Object.entries(obj)) {
      if(typeof val == 'function') {
        resolvedRoutes[basePath + '/' + key] = handleRequest(val);
      } else if (typeof val == 'object' && !objPath.includes(obj)) {
        resolvedRoutes = {
          ...resolvedRoutes,
          ...getRoutes(val, [...objPath, val], basePath + '/' + key)
        }
      }
    }
    return resolvedRoutes;
  }

  const resolvedRoutes = getRoutes(routes);

  return async (ctx, next) => {
    const cleanedUrl = cleanUrl(ctx.request.url) 
    if(!(cleanedUrl in resolvedRoutes)) ctx.throw(404);
    await resolvedRoutes[cleanedUrl](ctx);
    await next();
  }
}
