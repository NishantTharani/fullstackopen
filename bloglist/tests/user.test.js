const app = require('../app.js')
const supertest = require('supertest')
const api = supertest(app)
const Blog = require('../models/blog.js')
const User = require('../models/user')
const helper = require('./test_helper.js')
const mongoose = require('mongoose')

describe('invalid user creation fails', () => {
  test('empty username not allowed', async () => {
    const badUser = {
      name: 'First Last',
      password: 'abcdefghijkl'
    }

    await api
      .post('/api/users')
      .send(badUser)
      .expect(400)
  })

  test('too short password not allowed', async () => {
    const badUser = {
      username: 'user',
      name: 'First Last',
      password: 'ab',
    }

    await api
      .post('/api/users')
      .send(badUser)
      .expect(400)
  })
})

describe('valid user creation succeeds', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('initially no users', async () => {
    const users = await helper.usersInDb()
    expect(users).toHaveLength(0)
  })

  test('creating user works', async () => {
    const user = {
      username: 'user',
      name: 'First Last',
      password: 'abcde',
    }

    const initialUsers = await helper.usersInDb()

    await api
      .post('/api/users')
      .send(user)
      .expect(200)

    const endUsers = await helper.usersInDb()

    expect(endUsers).toHaveLength(initialUsers.length + 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})