exports.seed = ({mode, data: {categories}}) => {
  if(mode === 'clean') {
    const productsObj = require('./products.json');
    const allProducts = [];

    console.log(categories);

    for(const [category, products] of Object.entries(productsObj)) {
      const categoryId = categories.find(a => a.title === category)._id;
      for(const product of products) {
        allProducts.push({
          ...product,
          name: product.title.toLowerCase().replace(/[ _]/g,'-').replace(/[^a-z0-9-]/g, ''),
          category: categoryId,
          reviews: []
        })
      }
    }


  } else if(mode === 'random') {

  }
}