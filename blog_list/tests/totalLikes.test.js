const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listWithMultipleBlogs = [
    {
      _id: "622a7384564fc8b99af95c68",
      title: "ggg",
      author: "Cole",
      url: "www.blog.com",
      likes: 345,
      __v: 0
    },
    {
      _id: "622a739e564fc8b99af95c6b",
      title: "kfkag",
      author: "Cole",
      url: "www.blog.com",
      likes: 45,
      __v: 0
    },
    {
      _id: "622a7336564fc8b99af95c65",
      title: "ggg",
      author: "Cole",
      likes: 23,
      __v: 0
    }
  ]

  const listWithBlogsWithoutLikes = [
    {
      _id: "622a7384564fc8b99af95c68",
      title: "ggg",
      author: "Cole",
      url: "www.blog.com",
      likes: 345,
      __v: 0
    },
    {
      _id: "622a739e564fc8b99af95c6b",
      title: "kfkag",
      author: "Cole",
      url: "www.blog.com",
      likes: 45,
      __v: 0
    },
    {
      _id: "622a7336564fc8b99af95c65",
      title: "ggg",
      author: "Cole",
      __v: 0
    },
    {
      _id: "622a7336564fc8b99af95c65",
      title: "ggg",
      author: "Cole",
      likes: 23,
      __v: 0
    }
  ]

  test('when list has only one blog, returns that entry', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
  test('works with multiple blogs', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    expect(result).toBe(23 + 45 + 345)
  })
  test('works when some blogs don\'t have likes', () => {
    const result = listHelper.totalLikes(listWithBlogsWithoutLikes)
    expect(result).toBe(23 + 45 + 345)
  })
})