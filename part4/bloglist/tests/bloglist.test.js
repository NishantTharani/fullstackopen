const app = require('../app.js')
const supertest = require('supertest')
const api = supertest(app)
const Blog = require('../models/blog.js')
const helper = require('./test_helper.js')
const mongoose = require('mongoose')



beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const blogPromises = blogObjects
    .map(blog => blog.save())

  await Promise.all(blogPromises)
})

test('the correct number of blog posts are returned', async () => {
  const expectedBlogs = await helper.blogsInDb()

  const blogs = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(blogs.body).toHaveLength(expectedBlogs.length)
})

test('unique identifier property is named correctly', async () => {
  const blogs = await api.get('/api/blogs')

  await blogs.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
  
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
    .send(newBlog)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

test('missing likes property defaults to zero', async () => {
  const newBlog = {
    title: 'Test blog with no likes',
    author: 'Poster who nobody likes yet :(',
    url: 'none'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)

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
    .send(newBlog)
    .expect(400)
})

test('deleting a blog post works', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api.
    delete(`/api/blogs/${blogToDelete.id}`)
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
    .send(blog)

  const blogsAtEnd = await helper.blogsInDb()
  const updatedBlog = blogsAtEnd.filter(blog => blog.id === blogToUpdate.id)[0]

  expect(updatedBlog.likes).toEqual(blog.likes)
})

afterAll( () => {
  mongoose.connection.close()
})