const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Hello',
    author: 'James',
    url: 'blog.com',
    likes: 32,
  },
  {
    title: 'Goodbye',
    author: 'Jim',
    url: 'blog.com',
    likes: 0,
  }
]

const getToken = async () => {
  const user = (await api.get('/api/users')).body[0]
  const userForToken = {
    userName: user.userName,
    id: user.id,
  }
  const token = jwt.sign(userForToken, process.env.SECRET)
  return `bearer ${token}`
}

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ userName: 'root', passwordHash })
  await user.save()
  const savedUser = (await api.get('/api/users')).body[0]
  const blog1 = initialBlogs[0]
  const blog2 = initialBlogs[1]
  let blogObject = new Blog({
    title: blog1.title,
    author: blog1.author,
    url: blog1.url,
    likes: blog1.likes,
    user: savedUser.id
  })
  await blogObject.save()
  blogObject = new Blog({
    title: blog2.title,
    author: blog2.author,
    url: blog2.url,
    likes: blog2.likes,
    user: savedUser.id
  })
  await blogObject.save()
}, 10000)

describe('When there are initial blogs saved', () => {
  test('blogs are returned with the correct id key', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body.map(r => r.id)
    expect(id).toBeDefined()
  })
  
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })
  
  test('a specific blog is returned within the blog list', async () => {
    const response = await api.get('/api/blogs')
    const title = response.body.map(r => r.title)
    expect(title).toContain('Hello')
  })  
})

describe('Addition of a new blog', () => {
  test('blog without title or URL is not added', async () => {
    const newBlog1 = {
      author: 'Lil',
      url: 'blog.com',
      likes: 32,
    }
  
    const newBlog2 = {
      title: 'I\'m a blog',
      author: 'James',
      likes: 32,
    }
    await api
      .post('/api/blogs')
      .send(newBlog1)
      .set('authorization', await getToken())
      .expect(400)
  
    await api
      .post('/api/blogs')
      .send(newBlog2)
      .set('authorization', await getToken())
      .expect(400)
  
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.length)
  })
  
  test('When a blog without likes is added, likes equals 0', async () => {
    const newBlog = {
      title: 'Good Afternoon',
      author: 'Harry',
      url: 'blog.com',
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('authorization', await getToken())
      .expect(201)
  
    const response = await api.get('/api/blogs')
    const newBlogLikes = response.body[initialBlogs.length].likes
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(newBlogLikes).toBe(0)
  })
  
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Added a blog',
      author: 'Vince',
      url: 'blog.com',
      likes: 9,
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('authorization', await getToken())
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain('Added a blog')
  })
  test('adding a blog fails with the proper status code 401 Unauthorized if a token is not provided', async () => {
    const newBlog = {
      title: 'Added a blog',
      author: 'Vince',
      url: 'blog.com',
      likes: 9,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
    
    const response = (await api.get('/api/blogs')).body
    expect(response).toHaveLength(initialBlogs.length)

  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToDelete = blogsAtStart.body[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('authorization', await getToken())
      .expect(204)

    const blogsAtEnd = await api.get('/api/blogs')

    expect(blogsAtEnd.body).toHaveLength(
      initialBlogs.length - 1
    )

    const titles = blogsAtEnd.body.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('update an existing blog', () => {
  test('number of likes increases by 1', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    let blogToUpdate = {...blogsAtStart.body[0]}
    blogToUpdate.likes += 1
    console.log(blogToUpdate)
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
 
    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body[0].likes).toBe(blogsAtStart.body[0].likes + 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})