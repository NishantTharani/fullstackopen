const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const Blog = require('./models/blog.js')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const userLikesRouter = require('./controllers/userLikes')
const middleware = require('./utils/middleware')



mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

app.use(cors())
app.use(express.json())

app.use('/api/blogs', middleware.tokenExtractor, middleware.userExtractor, blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/userlikes', middleware.tokenExtractor, middleware.userExtractor, userLikesRouter)

app.use(middleware.errorHandler)

module.exports = app