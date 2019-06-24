const { ObjectID } = require('mongodb');
const faker = require('faker');

exports.seed = ({mode}) => {
  if(mode === 'clean') {
    return [
      {
        _id: new ObjectID(),
        title: 'Ladies Outerwear',
        image: 'media/ladies_outerwear.jpg'
      },
      {
        _id: new ObjectID(),
        title: 'Men\'s Outerwear',
        image: 'media/mens_outerwear.jpg'
      },
      {
        _id: new ObjectID(),
        title: 'Ladies T-Shirts',
        image: 'media/ladies_tshirts.jpg'
      },
      {
        _id: new ObjectID(),
        title: 'Mens T-Shirts',
        image: 'media/mens_tshirts.jpg'
      }
    ]
  } else if(mode === 'random') {
    const categories = [];
    const amount = 5;

    for(let i = 0; i < amount; i++) {
      categories.push({
        _id: new ObjectID(),
        image: faker.image.fashion(),
        title: commerce.department()
      });
    }
  }
}