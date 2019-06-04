(async () => {
  console.clear();
  await require('./db').connect();
  const Koa = require('koa');
  const bodyParser = require('koa-bodyparser');
  const { router } = require('./object-router');
  const cors = require('@koa/cors');
  const api = require('./api');
  const { userMiddleware } = require('./models/users');

  console.log(api);

  const app = new Koa();
  
  app.use(cors({
    origin: 'http://localhost:8392'
  }))
  
  app.use(bodyParser());

  app.use(userMiddleware)

  app.use(router(api))

  const port = process.env.PORT || 8391;
  
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
})();

global.FUCK = true;