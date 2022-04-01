const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { userName, name, password } = request.body
  const existingUser = await User.findOne({ userName })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }
  if (!userName || !password || userName.length < 4 || password.length < 4) {
    return response.status(400).json({
      error: 'username and password are required and must be at least 3 characters long'
    })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    userName,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter