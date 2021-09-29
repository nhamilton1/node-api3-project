const Users = require('../users/users-model')
const yup = require('yup')

function logger(req, res, next) {
  console.log(`${req.method} request to ${req.originalUrl} at ${Date().toLocaleString()}`)
  next()
}

async function validateUserId(req, res, next) {
  try {
    const userIdCheck = await Users.getById(req.params.id)
    if(userIdCheck){
      req.user = userIdCheck
      next()
    } else {
      res.status(404).json({
        status: 404, 
        message: "user not found" 
      })
    }
  } catch (err) {
    next(err)
  }
}

const userSchema = yup.object().shape({
  name: yup
  .string()
  .typeError('name must be a string')
  .trim()
  .required('name is required')
  .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
})

async function validateUser(req, res, next) {
  try {
    const validated = await userSchema.validate(
      req.body, 
      { strict: false, stripUnknown: true }
    )
    req.body = validated
    next()
  } catch (err) {
    res.status(400).json({
      message: 'missing required name field'
    })
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  next()
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}
