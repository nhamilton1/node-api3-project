const express = require('express');
const { validatePost, validateUser, validateUserId } = require('../middleware/middleware')
const User = require('./users-model')
const Post = require('../posts/posts-model')

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const getUsers = await User.get(req.query)
    res.status(200).json(getUsers)
  } catch (err) {
    next(err)
  }
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  User.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(next)
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  User.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(next)
});

router.delete('/:id', validateUserId, (req, res, next) => {
  User.remove(req.params.id)
    .then(() => {
      res.status(200).json(req.user)
    })
    .catch(next)

  // try {
  //   await User.remove(req.params.id)
  //   res.json(req.user)
  // } catch (err) {
  //   next(err)
  // }
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  User.getUserPosts(req.params.id)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(next)

  // try {
  //   const getPost = await User.getUserPosts(req.params.id)
  //   res.json(getPost)
  // } catch (err) {
  //   next(err)
  // }

});

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  try {
    const test = await Post.insert({
      user_id: req.params.id,
      text: req.body.text,
    })
    res.json(test)
  } catch (err) {
    next(err)
  }
});

module.exports = router
