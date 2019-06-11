const { db } = require('../db');
const { APIError } = require('../remote-object-server');

const products = db.collection('products');
const categories = db.collection('categories');

module.exports.public = async (category) => {
  if(!category) {
    throw new APIError('Category is required');
  }

  categories.find()

  products.find({category})
};