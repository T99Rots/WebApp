const { registerUser } = require('./users');
const joi = require('@hapi/joi');

const userSchema = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().regex().required(),
  postcode: joi.string().regex(/^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i).required(),
  houseNumber: joi.number().precision(0).min(0).required(),
  houseNumberAddition: joi.string().regex(/[A-Za-z]{0,2}/),
  street: joi.string(),
  city: joi.string()
})

const getErrorMessage = (err) => {
  switch(err.label) {
    case 'email':
      return 'Invalid email!'
    case 'password':
      return 'Your password does not reach the minimum requirements!'
    case 'postcode':
      return 'Invalid postcode!'
    case 'houseNumber':
      return 'Invalid house number!'
    case 'houseNumberAddition':
      return 'Invalid house number addition!'
    default: 
      return err.description || 'unknown error...'
  }
}

module.exports = (req, res) => {
  if(!req.body) {
    res.send(JSON.stringify({
      error: 'request body missing'
    }))
  }
  
  const result = joi.validate(req.body, userSchema);

  if(result.error) {
    res.send(getErrorMessage(result.error))
  }
  
  registerUser(req.body);
}