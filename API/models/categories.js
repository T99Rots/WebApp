const { db } = require('../db');
const { hostname, port } = require('../index');

console.log(hostname, port);

exports.public = async () => {
  return (await db.collection('categories').find({}).toArray()).map(category => {
    return {
      ...category,
      image: `http://${hostname}:${port}/` + category.image
    }
  });
}