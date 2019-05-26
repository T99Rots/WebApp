const { ObjectID } = require('mongodb'); 
const { db } = require('../db');
const bcrypt = require('bcrypt');
const joi = require('@hapi/joi');

const users = db.collection('users')

const tokenExpirationTime = 1000 * 60 * 60 * 24 * 30 * 3;

const genToken = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let token = '';
  for(let i = 0; i < 64; i++) {
    token+= chars.charAt(Math.floor(Math.random()*64));
  }
  return {
    id: token,
    expirationDate: new Date(Date.now()+tokenExpirationTime)
  }
}

const cleanUserObject = (obj) => {
  const newObj = {...obj};
  delete newObj.tokens;
  delete newObj.password;
  return newObj
}

const userSchema = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().min(10).required(),
  address: joi.object().keys({
    postcode: joi.string().regex(/^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i).required(),
    houseNumber: joi.number().precision(0).min(0).required(),
    houseNumberAddition: joi.string().regex(/[A-Za-z]{0,2}/),
    street: joi.string().required(),
    city: joi.string().required()
  }).required()
})

const cachedUsersByEmail = {};
const cachedUsersById = {};

// remove users from cache when they have been inactive 
// for more then 20 minutes
setInterval(() => {
  for(const [id, user] of Object.entries(cachedUsersById)) {
    if(user.lastActive < (Date.now() + (20 * 60 * 1000))) {
      delete cachedUsersById[id];
      delete cachedUsersByEmail[user.email];
    }
  }
}, 60 * 1000);

const updateUserActivity = (userId, token) => {
  const user = cachedUsersById[userId];
  
}

const getUserByEmail = async (email) => {
  if(email in cachedUsersByEmail) {
    return cachedUsersByEmail[email];
  } else {
    const user = await users.findOne({email});
    if(user) {
      cachedUsersByEmail[email] = user;
      cachedUsersById[user._id] = user;
      return user;
    } else {
      return false;
    }
  }
}

const getUserById = async (id) => {
  if(id in cachedUsersById) {
    return cachedUsersById[id];
  } else {
    const user = await users.findOne({_id: id});
    if(user) {
      cachedUsersById[id] = user;
      cachedUsersByEmail[user.email] = user;
      return user;
    } else {
      return false;
    }
  }
}

const checkToken = async (id, token) => {
  const user = getUserById(id);

  if(!user) ctx.throw(404, 'User does not exist')

  return user.tokens.findIndex(obj => obj.id === token) !== -1;
}

exports.register = async (ctx) => {
  const { body } = ctx.request;

  if(typeof body !== 'object') {
    ctx.throw(400)
  }

  const result = joi.validate(body, userSchema);

  if(result.error) {
    ctx.throw(400, result.error.message);
    return;
  }

  const user = await getUserByEmail(body.email);

  if(user) {
    ctx.throw(409, 'Email already registered');
  }

  const hash = await bcrypt.hash(body.password, 10);

  const token = genToken();

  const newUser = {
    ...body,
    _id: new ObjectID(),
    password: hash,
    reviews: [],
    orderHistory: [],
    tokens: [token],
    registrationDate: new Date(),
    notifications: []
  }

  users.insertOne(newUser)

  ctx.body = {
    httpCode: 200,
    ...cleanUserObject(newUser)
  };

  ctx.cookies.set('token', token.id);
  ctx.cookies.set('user-id', user._id);
}

exports.login = async (ctx) => {
  const { body } = ctx.request;

  if(!('password' in body)) ctx.throw(400, 'password is missing from request body');
  if(!('email' in body)) ctx.throw(400, 'email is missing from request body');

  if(typeof body !== 'object') {
    ctx.throw(400)
  }

  const user = await users.findOne({email: body.email});

  if(!user) ctx.throw(404, 'This email has not been registered');

  if(!await bcrypt.compare(body.password, user.password)) ctx.throw(401, 'Wrong password!');

  const token = genToken();

  users.updateOne({email: body.email}, {$push: {tokens: token}})

  ctx.body = cleanUserObject(user, token);
  ctx.cookies.set('token', token.id);
  ctx.cookies.set('user-id', user._id);
}

exports.logout = async (ctx) => {

}

exports.checkToken = checkToken;

exports.tokenMiddleware = async (ctx) => {
  const userId = ctx.cookies.get('user-id');
  const token = ctx.cookies.get('token');

  if(!token || !userId) return;

  const user = getUserById(userId);

  if(!user) return;

  const tokenIndex = user.tokens.findIndex(obj => obj.id === token)
  const tokenObj = user.tokens[tokenIndex];

  if(tokenObj) {
    ctx.user = {
      ...user,
      validToken: true,
      usedToken: tokenObj
    }

    if(Date.now() - tokenObj.expirationDate < tokenExpirationTime - 1000 * 60 * 60 * 24) {
      const newExpirationDate = new Date(Date.now()+tokenExpirationTime);
      tokenObj.expirationDate = newExpirationDate;
      users.updateOne({_id: user._id}, {$set: {[`tokens.${tokenIndex}.expirationDate`]: newExpirationDate}});
    }
  }
}