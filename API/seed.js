(async () => {
  await require('./db').connect();
  const fs = require('fs');
  const path = require('path');

  // can be clean or random
  const mode = 'clean'

  const seeders = [
    'categories',
    'products',
    'users',
    'orders',    
    'reviews'
  ]

  const ctx = {
    data: {},
    mode
  }

  for(const seeder of seeders) {
    ctx.data[seeder] = require(path.join(__dirname, './seed/', seeder)).seed(ctx);
  }

  console.log(ctx);
})()