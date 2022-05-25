const userLikesRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/user')
const UserLikes = require('../models/userLikes')

userLikesRouter.get('/', async (request, response) => {
  const userId = request.user.id

  const likedBlogs = await UserLikes.find({userId: userId})

  response.json(likedBlogs)
})

userLikesRouter.post('/:id', async (request, response) => {
  const blogId = request.params.id
  const userId = request.user.id

  const userLikesObj = {
    userId: userId,
    blogId: blogId
  }

  const exists = await UserLikes.exists(userLikesObj)

  if (exists) {
    const out = await UserLikes.findOneAndDelete(userLikesObj)
    console.log(out)
    response.json(out)
  } else {
    const userLikes = new UserLikes(userLikesObj)
    const out = await userLikes.save()
    console.log(out)
    response.json(out)
  }
})

userLikesRouter.get('/:id', async (request, response) => {
  const blogId = request.params.id

  const likes = await UserLikes.countDocuments({blogId: blogId})

  response.json(likes)
})

userLikesRouter.delete('/:id', async (request, response) => {
  const userId = request.user.id
  const blogId = request.params.id

  const conditions = {
    userId: userId,
    blogId: blogId
  }

  await UserLikes.findOneAndDelete(conditions)
})


module.exports = userLikesRouter