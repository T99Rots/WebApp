console.clear();
(async () => {
  const Koa = require('koa');
  const bodyParser = require('koa-bodyparser');
  const setupRouter = require('./router');

  await require('./db').connect();
  
  const app = new Koa();
  
  
  app.use(bodyParser());
  // app.use(async (ctx, next) => {
  //   console.log(ctx.request.body, 'aaaaaaaaaa');
  //   console.log(ctx.request.url);
  //   await next();
  // })
  // app.use(require('./routes/routes.js').routes());
  
  app.use(setupRouter({
    test: ({user, ctx}) => async (...args) => {console.log(user,ctx,args)}
  }, () => 'i\'m a user'))

  const port = process.env.PORT || 8391;
  
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
})();