const { db } = require('../db');
const bcrypt = require('bcrypt');

const cachedUsers = {};

// remove users from cache when they have been inactive 
// for more then 20 minutes
setInterval(() => {
  for(const [email, user] of Object.entries(activeSessions)) {
    if(user._lastActive < (Date.now() + (20 * 60 * 1000))) {
      delete cachedUsers[email];
    }
  }
}, 60 * 1000)

exports.getUser = async (email) => {
  const users = db.collection('users');
  
  if(email in cachedUsers) {
    return cachedUsers[email];
  } else {
    const user = await users.findOne({email});
    if(user) {
      cachedUsers[email] = user;
      return user;
    } else {
      return false;
    }
  }
}

exports.checkToken = async (email, token) => {

}

exports.checkPassword = async (email, password) => {

}

exports.registerUser = async (email, password) => {
  const user = await users.findOne({email});

  if(user) {
    throw new Error('This email has already been used!');
  }

  const hash = bcrypt.hash(password, 10);

  // users.insertOne({
  //   email: 
  // })
}

exports.login = async (email, password) => {

}

exports.logout = async (email, token) => {

}