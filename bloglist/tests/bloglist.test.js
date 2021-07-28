const app = require('../app.js')
const supertest = require('supertest')
const api = supertest(app)
const Blog = require('../models/blog.js')
const User = require('../models/user')
const helper = require('./test_helper.js')
const mongoose = require('mongoose')


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


describe('adding blog posts', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
  })

  test('adding a blog post works', async () => {
    const newBlog = {
      title: 'Is this added?',
      author: 'Blog poster',
      url: 'none',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(1)
  })

  test('missing likes property defaults to zero', async () => {
    const newBlog = {
      title: 'Test blog with no likes',
      author: 'Poster who nobody likes yet :(',
      url: 'none'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)

    const blogs = await helper.blogsInDb()
    const blog = blogs.filter(blog => blog.title === 'Test blog with no likes')[0]

    expect(blog.likes).toEqual(0)

  })

  test('creation fails if missing title or url properties', async () => {
    const newBlog = {
      author: 'Formless author',
      likes: 1,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })
})

describe('viewing and deleting blog posts', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    for (const blog of helper.initialBlogs) {
      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(blog)
    }
  })

  test('the correct number of blog posts are returned', async () => {
    const expectedBlogs = await helper.blogsInDb()

    expect(expectedBlogs).toHaveLength(helper.initialBlogs.length)

    const blogs = await api.get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(blogs.body).toHaveLength(expectedBlogs.length)
  })

  test('unique identifier property is named correctly', async () => {
    const blogs = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)

    await blogs.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })

  })

  test('deleting a blog post works', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.
      delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
  })

  test('updating a blog works', async () => {
    const blogs = await helper.blogsInDb()
    const blogToUpdate = blogs[0]

    const blog = {
      title: 'Newly updated title',
      author: 'Newly updated author',
      url: 'none',
      likes: 1014091
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `bearer ${token}`)
      .send(blog)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd.filter(blog => blog.id === blogToUpdate.id)[0]

    expect(updatedBlog.likes).toEqual(blog.likes)
  })
})






afterAll( () => {
  mongoose.connection.close()
})