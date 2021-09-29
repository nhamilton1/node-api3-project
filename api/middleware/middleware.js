const Users = require('../users/users-model')

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
      next({ status: 404, message: "user not found" })
    }
  } catch (err) {
    next(err)
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  next()
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
