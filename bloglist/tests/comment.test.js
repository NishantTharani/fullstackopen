const app = require('../app.js')
const supertest = require('supertest')
const api = supertest(app)
const Blog = require('../models/blog.js')
const User = require('../models/user')
const helper = require('./test_helper.js')
const mongoose = require('mongoose')
const Comment = require('../models/comment')

let token

beforeEach(async () => {
  await User.deleteMany({})
  const initialUser = helper.initialUsers[0]
  const userResponse = await api
    .post('/api/users')
    .send(initialUser)
    .expect(200)
  const loggedin = await api
    .post('/api/login')
    .send({username: initialUser.username, password: initialUser.password})
    .expect(200)
  token = loggedin.body.token
})

test('blank test', async () => {
  return true
})

describe('adding comments', () => {
  beforeEach(async () => {
    await Comment.deleteMany({})
  })

  test('adding a comment works', async () => {
    const newComment = {
      text: 'Am I a comment?'
    }

    await api
      .post('/api/blogs/611d600908fbcb0e280d0398/comments')
      .set('Authorization', `bearer ${token}`)
      .send(newComment)
      .expect(200)
  })
})
