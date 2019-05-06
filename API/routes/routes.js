const express = require('express');
const path = require('path');
const router = express.Router();

const routes = {
  categories: 'get',
  products: 'get',
  product: 'get',
  review: 'post',
  cart: 'get',
  register: 'post',
  login: 'post',
  logout: 'post',
  checkout: 'post',
  ping: 'post',
  orders: 'get',
  complete_order: 'post'
}

for(const [route, method] of Object.entries(routes)) {
  app[method](route, require(path.join(__dirname, '../models/', route + '.js')))
}

module.exports = router;