const Router = require('koa-router')
const path = require('path');

const router = new Router();

const routes = {
  '/categories': 'get',
  '/products': 'get',
  '/product': 'get',
  '/review': 'post',
  '/cart': 'get',
  '/users/register': 'post',
  '/users/login': 'post',
  '/users/logout': 'post',
  '/users/ping': 'post',
  '/checkout': 'post',
  '/orders': 'get',
  '/complete_order': 'post',
  '/test': 'get'
}

// {'/users/register': 'post'} would result in router.post('/users/register', require('../models/users.js').register)
for(const [route, method] of Object.entries(routes)) {
  const [moduleName, ...keys] = route.split('/').filter(s=>s.length>0);
  let module = require(path.join(__dirname, '../models/', moduleName + '.js'));
  for(const key of keys) {
    module = module[key];
  }
  console.log(method ,route, module);
  if(typeof module === 'function') {
    router[method](route, module);
  } else {
    console.error(`Error: ${route} is missing`);
  }
}

module.exports = router;