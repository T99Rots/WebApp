const { ObjectID } = require('mongodb');

exports.seed = ({mode, data: {categories}}) => {
  if(mode === 'clean') {
    const productsObj = require('./products.json');
    const allProducts = [];

    for(const [category, products] of Object.entries(productsObj)) {
      const categoryId = categories.find(a => a.title === category)._id;
      for(const product of products) {
        const versions = ['XS','S','M','L','XL'].map(v=>({
          name: v,
          price: product.price,
          _id: new ObjectID()
        }))
        allProducts.push({
          ...product,
          category: categoryId,
          reviews: [],
          _id: new ObjectID(),
          versions,
          defaultVersion: versions[2]._id
        })
      }
    }

    return allProducts;
  } else if(mode === 'random') {

  }
}