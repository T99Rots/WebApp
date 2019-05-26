console.clear();
(async () => {
  const Koa = require('koa');
  const bodyParser = require('koa-bodyparser');
  
  await require('./db').connect();
  
  const app = new Koa();
  
  app.use(bodyParser());
  app.use(require('./routes/routes.js').routes());
  
  const port = process.env.PORT || 8391;
  
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
})();