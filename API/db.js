const MongoClient = require('mongodb').MongoClient;

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = process.env.MONGO_DB_NAME || 'web-shop'

module.exports.connect = new Promise((resolve, reject) => {
  MongoClient.connect(mongoUrl, (err, client) => {
    if(err) {
      reject(err);
    } else {
      module.exports.client = client;
      module.exports.db = client.db(dbName);
      resolve(client);
    }
  })
})