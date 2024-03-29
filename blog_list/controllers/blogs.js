const blogRouter = require('express').Router();
const Blog = require('../models/blog')
const { v4: uuidv4 } = require('uuid')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { userName: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
    comments: []
  })
  if (!body.likes) blog.likes = 0
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  const result = await Blog.findById(savedBlog._id).populate('user', { userName: 1, name: 1 })
  response.status(201).json(result)
})

blogRouter.post('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog.comments) blog.comments = []
  const newComment = request.body.comment
  const commentWithId = {
    comment: newComment,
    id: uuidv4()
  }
  blog.comments = blog.comments.concat(commentWithId)
  const savedBlog = await blog.save()
  const result = await Blog.findById(savedBlog._id).populate('user', { userName: 1, name: 1 })
  response.json(result)
})

blogRouter.delete('/:id', async (request, response) => {
  const userid = request.user._id
  const blogUser = (await Blog.findById(request.params.id)).user
  if (!userid || !blogUser) {
    return response.status(401).json({ error: "invalid token" })
  }
  if (blogUser.toString() === userid.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  } else {
    return response.status(401).json({ error: "invalid token" })
  }
})

blogRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: 'query' }
  ).populate('user', { userName: 1, name: 1 })
  response.json(updatedBlog)
})

module.exports = blogRouter