const { ObjectID } = require('mongodb');
const faker = require('faker/locale/nl');
const bcrypt = require('bcrypt');

const genChar = () => (Math.floor(Math.random()*26)+10).toString(36).toUpperCase();
const genPostCode = () => faker.random.number({min: 1000, max: 9999}) + genChar() + genChar();

const tokenExpirationTime = 1000 * 60 * 60 * 24 * 30 * 3;
new Date(Date.now()+tokenExpirationTime)
const genToken = (lastActive) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let token = '';
  for(let i = 0; i < 64; i++) {
    token+= chars.charAt(Math.floor(Math.random()*64));
  }
  return {
    id: token,
    expirationDate: new Date(+lastActive + tokenExpirationTime)
  }
}


const genUser = async (hash) => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  
  const registerDate = faker.date.past(2);
  const lastActiveDate = faker.date.between(registerDate, new Date());

  const tokens = [genToken(lastActiveDate)];

  if(lastActiveDate > (Date.now() - tokenExpirationTime)) {
    const n = faker.random.number({max: 4});
    for(let i = 0; i < n; i++) {
      const lastActive = faker.date.between(new Date(Date.now()-tokenExpirationTime),lastActiveDate);
      tokens.push(genToken(lastActive));
    }
  }

  return {
    _id: new ObjectID(),
    email: faker.internet.email(firstName,lastName),
    name: `${firstName} ${lastName}`,
    password: hash,
    tokens,
    orderHistory: [],
    reviews: [],
    registerDate,
    lastActiveDate,
    address: {
      country: 'Netherlands',
      postCode: genPostCode(),
      street: faker.address.streetName(),
      houseNumber: faker.random.number({max: 150}),
      city: faker.address.city()
    }
  };
}

exports.seed = async () => {
  const users = [];

  const userCount = faker.random.number({min: 40000, max: 65000});
  const hash = await bcrypt.hash('welcome123', 10);

  for(let i = 0; i < userCount; i++) {
    users.push(genUser(hash));
  }

  return Promise.all(users);
}