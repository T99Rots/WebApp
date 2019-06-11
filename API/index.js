(async () => {
  console.clear();
  await require('./db').connect();
  const api = require('./api');
  const { Router } = require('./remote-object-server');

  new Router(api, {port: process.env.PORT || 8391});
})();
