const { db } = require('../db');
const { APIError } = require('../remote-object-server');
const { ObjectID } = require('mongodb');

const products = db.collection('products');

exports.public = async (productId) => {
  if(!productId) {
    throw new APIError('Product id is required');
  }

  return products.findOne({_id: new ObjectID(productId)});
};