const { ObjectID } = require('mongodb');
const faker = require('faker');

exports.seed = ({data: {users, products}}) => {
  const orders = [];

  for(const user of users) {
    if(Math.random()<0.95) {
      const n = faker.random.number({min: 1, max: 4});
      const userOrders = [];

      for(let i = 0; i < n; i++) {
        const id = new ObjectID();

        user.orderHistory.push(id);

        const orderDate =faker.date.between(user.registerDate, user.lastActiveDate);
        const productCount = faker.random.number({min: 1, max: 5});

        let total = 0;
        let status;
        let orderedProducts = [];
        
        if(orderDate > (Date.now() - (1000 * 60 * 60 * 24 * 14)) && Math.random() > 0.5) {
          status = faker.random.arrayElement(['registered', 'processing', 'awaiting_shipment', 'send']);
        } else {
          status = 'delivered';
        }

        for(let i = 0; i < productCount; i++) {
          const product = faker.random.arrayElement(products);
          const count = faker.random.number({min: 1, max: 4});

          orderedProducts.push({
            id: product._id,
            count  
          });

          total+=product.price*count;
        }

        userOrders.push({
          _id: id,
          orderer: user._id,
          orderDate,
          status,
          total: Math.floor(total*100)/100,
          deliveryAddress: user.address,
          products: orderedProducts
        });
      }
      orders.push(...userOrders);
    }
  }
  return orders;
}