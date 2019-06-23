const yargs = require('yargs');

(async () => {
  const dbModule = require('./db');
  const fs = require('fs');
  const path = require('path');
  
  await dbModule.connect();
  const db = dbModule.db;

  // can be clean or random
  const mode = yargs.argv.mode || 'clean';

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
    ctx.data[seeder] = await require(path.join(__dirname, './seed/', seeder)).seed(ctx);
  }

  for(const collectionName of seeders) {
    if(Array.isArray(ctx.data[collectionName]) && ctx.data[collectionName].length > 0) {
      await db.collection(collectionName).bulkWrite(ctx.data[collectionName].map(doc => ({
        insertOne: doc
      })));
    }
  }

  console.log('Seeding completed!');
  process.exit();
})()