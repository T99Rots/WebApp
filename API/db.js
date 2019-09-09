const mongoDBHelper = require('./mongoDBHelper');

exports.mongoDB = mongoDBHelper.mongoDB;

exports.connect = async () => {
  const { db } = await mongoDBHelper.init({
    dbName: 'web-shop',
    mongoURL: '',
    schema: {
      users: ['_id','email'],
      orders: ['_id','orderer','orderDate','status','products.id'],
      reviews: ['_id','product','reviewer','likes'],
      products: ['_id','category','price','name'],
      categories: ['_id']  
    }
  });

  exports.db = db;

  globalThis.db = db;

  return db;
}