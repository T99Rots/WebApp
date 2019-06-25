const { db } = require('../db');
const { APIError } = require('../remote-object-server');
const { ObjectID } = require('mongodb');

const products = db.collection('products');

exports.public = async (category) => {
  if(!category) {
    throw new APIError('Category is required');
  }

  return (await products
    .find({category: new ObjectID(category)})
    .toArray())
    .map(({image, _id, title}) => ({
      image,
      _id,
      title
    }));
};