const userLikesRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/user')
const UserLikes = require('../models/userLikes')

userLikesRouter.post('/:id', async (request, response) => {
  const blogId = request.params.id
  const userId = request.user.id

  const userLikesObj = {
    userId: userId,
    blogId: blogId
  }

  const userLikes = new UserLikes(userLikesObj)
  const userLiked = await userLikes.save()
})

userLikesRouter.delete('/:id', async (request, response) => {
  const userId = request.user.id
  const blogId = request.params.id

  const conditions = {
    userId: userId,
    blogId: blogId
  }

  UserLikes.findOneAndDelete(conditions)
})


module.exports = userLikesRouter