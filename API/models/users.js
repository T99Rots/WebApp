let public = exports.public = {};

const { ObjectID } = require('mongodb'); 
const { db } = require('../db');
const bcrypt = require('bcrypt');
const joi = require('@hapi/joi');
const { APIError } = require('../object-router')
const { ObjectStore } = require('../object-store');

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

const userCache = new ObjectStore('_id', 'email');

// remove users from cache when they have been inactive 
// for more then 20 minutes
setInterval(() => {
  for(const user of userCache) {
    if(user.lastActive < (Date.now() + (20 * 60 * 1000))) {
      userCache.delete(user);
    }
  }
}, 60 * 1000);

const updateUserActivity = (userId, token) => {
  const user = cachedUsersById[userId];
  
}

const getUserByEmail = async (email) => {
  if(userCache.get('email', email)) {
    return userCache.get('email', email);
  } else {
    const user = await users.findOne({email});
    if(user) {
      userCache.add(user);
      return user;
    } else {
      return false;
    }
  }
}

const getUserById = async (id) => {
  if(userCache.get('_id', id)) {
    userCache.get('_id', id);
  } else {
    const user = await users.findOne({_id: id});
    if(user) {
      userCache.add(user);
      return user;
    } else {
      return false;
    }
  }
}

const checkToken = async (id, token) => {
  const user = getUserById(id);

  if(!user) throw new APIError(404, 'User does not exist')

  return user.tokens.findIndex(obj => obj.id === token) !== -1;
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
  name: joi.string().required()
})

public.register = (user) => async ({ cookies }) => {
  const result = joi.validate(user, userSchema);

  if(result.error) throw new APIError(400, result.error.message);

  if(await getUserByEmail(user.email.toLowerCase())) {
    throw new APIError(409, 'Email already registered');
  }

  const hash = await bcrypt.hash(user.password, 10);

  const token = genToken();

  const newUser = {
    name: user.name,
    email: user.email.toLowerCase(),
    _id: new ObjectID(),
    password: hash,
    reviews: [],
    orderHistory: [],
    tokens: [token],
    registrationDate: new Date(),
    notifications: []
  }

  users.insertOne(newUser)

  cookies.set('token', token.id, {overwrite: true});
  cookies.set('user-id', user._id, {overwrite: true});
}

public.login = ({ email, password }) => async ({ cookies }) => {
  if(!password) throw new APIError(400, 'Missing property: password');
  if(!email) throw new APIError(400, 'Missing property: email');

  email = email.toLowerCase();

  const user = await users.findOne({email});

  if(!user) throw new APIError(404, 'This email has not been registered');

  if(!await bcrypt.compare(password, user.password)) throw new APIError(401, 'Wrong password');

  const token = genToken();

  users.updateOne({email: email}, {$push: {tokens: token}})

  cookies.set('token', token.id, {overwrite: true});
  cookies.set('user-id', user._id, {overwrite: true});
}

exports.logout = async (ctx) => {

}

exports.checkToken = checkToken;

exports.userMiddleware = async (ctx, next) => {
  const token = ctx.cookies.get('token');
  const userId = ctx.cookies.get('user-id');

  if(token && userId) {
    const tokenValid = await checkToken(userId, token);
    if(tokenValid) {
      ctx.user = getUserById(userId);
    } else {
      ctx.user = null;
    }
  }

  await next();
}