const mongoDB = require('mongodb');
const MongoClient = mongoDB.MongoClient;

exports.mongoDB = mongoDB;

exports.init = ({
  mongoUrl = 'mongodb://localhost:27017',
  dbName,
  schema = {}
}) => new Promise((resolve, reject) => {
  MongoClient.connect(mongoUrl, { useNewUrlParser: true }, async (err, client) => {
    if(err) {
      reject(err);
    } else {
      module.exports.client = client;
      const db = module.exports.db = client.db(dbName);
      await buildDB(db, schema);
      resolve({client, db, mongoDB, MongoClient});
      global.db = db;
    }
  })
});

const buildDB = async (db, schema) => {
  const collectionNames = (await db.collections()).map(collection => collection.collectionName);
 
  for (const collectionName in schema) {
    const indexes = schema[collectionName].filter(a => a !== '_id');
    let collection;

    if (!collectionNames.includes(collectionName)) {
      collection = await db.createCollection(collectionName);
    } else {
      collection = db.collection(collectionName);
    }

    if (indexes.length > 0) {
      const missingIndexes = [];
      for (const indexDefinition of indexes) {
        let indexName;
        if (Array.isArray(indexDefinition)) {
          indexName = indexDefinition.join('+');
        } else if(typeof indexDefinition == 'object') {
          if (Array.isArray(indexDefinition.key)) {
            indexName = indexDefinition.key.join('+');
          } else if (typeof indexDefinition.key == 'string'){
            indexName = indexDefinition.key;
          }
        } else {
          indexName = indexDefinition;
        } 
        if (!await collection.indexExists(indexName)) {
          if (Array.isArray(indexDefinition)) {
            missingIndexes.push({
              name: indexName,
              key: indexDefinition.reduce((a, b) => Object.assign(a, b), {})
            });
          } else if(typeof indexDefinition == 'object') {
            let key;
            if(Array.isArray(indexDefinition.key)) {
              key = indexDefinition.key.reduce((a, b) => Object.assign(a, b), {});
            } else {
              key = { [indexName]: 1 };
            }
            missingIndexes.push({
              ...indexDefinition,
              name: indexName,
              key
            });
          } else {
            missingIndexes.push({
              name: indexName,
              key: { [indexName]: 1 }
            });
          }
        }
      }
      if (missingIndexes.length > 0) collection.createIndexes(missingIndexes);
    }
  }
}