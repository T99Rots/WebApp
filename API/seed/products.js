const { ObjectID } = require('mongodb');

exports.seed = ({mode, data: {categories}}) => {
  if(mode === 'clean') {
    const productsObj = require('./products.json');
    const allProducts = [];

    for(const [category, products] of Object.entries(productsObj)) {
      const categoryId = categories.find(a => a.title === category)._id;
      for(const product of products) {
        allProducts.push({
          ...product,
          category: categoryId,
          reviews: [],
          _id: new ObjectID()
        })
      }
    }

    return allProducts;
  } else if(mode === 'random') {

  }
}