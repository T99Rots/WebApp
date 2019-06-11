let public = exports.public = {};

const { ObjectID } = require('mongodb'); 
const { db } = require('../db');
const bcrypt = require('bcrypt');
const joi = require('@hapi/joi');
const { APIError } = require('../object-router')
const { ObjectStore } = require('../object-store');

const users = db.collection('users')

const tokenExpirationTime = 1000 * 60 * 60 * 24 * 30 * 3;
const REQUIRED_ERROR = 'This field is required';

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

const userSchema = joi.object().keys({
  email: joi.string().email(),
  password: joi.string().min(10),
  name: joi.string()
})

public.register = (user) => async (session) => {
  const result = joi.validate(
    user,
    userSchema,
    {
      abortEarly: false,
      presence: 'required'
    }
  );

  if(result.error) throw new APIError(result.error.message);

  if(await getUserByEmail(user.email.toLowerCase())) {
    throw new APIError('Email already registered');
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

  session.token = token.id;
  session.user = newUser;

  return {
    token: token.id,
    userId: newUser._id
  };
}

public.login = ({ email, password }) => async (session) => {

  if(!password || !email) {
    const errors = {};
    if(!password) errors.password = REQUIRED_ERROR;
    if(!email) errors.email = REQUIRED_ERROR;
    return {
      success: false,
      errors
    }
  }
  
  const user = await users.findOne({email: email.toLowerCase()});

  if(!user) return {
    success: false,
    errors: {
      email: 'This email has not been registered'
    }
  }

  if(!await bcrypt.compare(password, user.password)) throw new APIError('Wrong password');

  const token = genToken();

  users.updateOne({email: email.toLowerCase()}, {$push: {tokens: token}})
  
  session.token = token.id;
  session.user = user;

  return {
    success: true,
    token: token.id,
    userId: user._id
  }
}

public.identify = ({token, userId}) => async (session) => {
  if(token && userId) {
    const user = await users.findOne({_id: new ObjectID(userId)})

    if(!user) return false;
  
    const tokenValid = user.tokens.findIndex(obj => obj.id === token) !== -1;
    if(tokenValid) {
      session.token = token;
      session.user = user;
    }
    return tokenValid;
  } else {
    return false;
  }
}

public.logout = async () => async (session) => {
  const res = await users.updateOne({
    _id: new ObjectID(session.user._id)},
    {
      $pull: {
        tokens: {
          id: session.token
        }
      }
    }
  )
  return res.result.nModified > 0;
}