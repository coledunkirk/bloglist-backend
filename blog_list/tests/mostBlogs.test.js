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

  const test1Result = {
    author: ['Edsger W. Dijkstra'],
    blogs: 1
  }

  const listWithMultipleBlogs = [
    {
      _id: "622a7384564fc8b99af95c68",
      title: "ggg",
      author: "Dan",
      url: "www.blog.com",
      likes: 345,
      __v: 0
    },
    {
      _id: "622a739e564fc8b99af95c6b",
      title: "kfkag",
      author: "Fred",
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
    },
    {
      _id: "622a7336564fc8b99af454353",
      title: "ggg",
      author: "Cole",
      likes: 23,
      __v: 0
    }

  ]

  const test2Result = {
    author: ["Cole"],
    blogs: 2
  }

  const listWithMultipleMaxAuthors = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d43543543",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]

  const test3Result = {
    author: ["Robert C. Martin", "Edsger W. Dijkstra"],
    blogs: 3
  }


  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual(test1Result)
  })
  test('works with multiple blogs', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs)
    expect(result).toEqual(test2Result)
  })
  test('works with multiple max authors', () => {
    const result = listHelper.mostBlogs(listWithMultipleMaxAuthors)
    expect(result).toEqual(test3Result)
  })
})