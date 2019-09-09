const { db } = require('../db');
const { APIError } = require('../remote-object-server');
const { ObjectID } = require('mongodb');
const { hostname, port } = require('../index');

console.log(db);

const products = db.collection('products');

exports.public = async (productId) => {
  if(!productId) {
    throw new APIError('Product id is required');
  }

  const product = await products.findOne({_id: new ObjectID(productId)});

  product.image = `http://${hostname}:${port}/media/` + product.largeImage;
  delete product.largeImage;

  return product;
};