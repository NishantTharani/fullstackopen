const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const Comment = require('../models/comment')




blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1, id: 1 })
    .populate({
      path: 'comments',
      model: 'Comment',
    })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
  if (!('title' in request.body) || !('url' in request.body)) {
    response.sendStatus(400)
  } else {
    const blogObj = request.body
    const user = request.user
    blogObj['user'] = user.id

    const blog = new Blog(blogObj)
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    response.json(savedBlog)
  }
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const commentObj = request.body

  commentObj['blog'] = blog.id
  const comment = new Comment(commentObj)
  const savedComment = await comment.save()

  blog.comments = blog.comments.concat(savedComment.id)
  await blog.save()

  response.json(savedComment)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(blog.id)
  } else {
    return response.status(401).json({ error: 'cant delete other users blog'})
  }

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter