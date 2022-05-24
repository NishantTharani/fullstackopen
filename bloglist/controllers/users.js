const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (request, response, next) => {
  const body = request.body
  const password = body.password

  if (!password || password.length < 3) {
    return response.status(400).json({ error: 'password missing or too short' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

userRouter.get('/', async (request, response) => {
  const users = await User.find({})
    .populate('blogs', {url: 1, title: 1, author: 1})

  response.json(users)
})

userRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
    .populate('blogs', {title: 1})

  response.json(user)
})

module.exports = userRouter

