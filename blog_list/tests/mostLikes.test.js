const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  const listWithOneBlogWithoutLikes = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      __v: 0
    }
  ]

  const test2 = {
    author: 'Edsger W. Dijkstra',
    likes: 0
  }

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

  const test1 = {
    author: 'Edsger W. Dijkstra',
    likes: 5
  }

  const listWithMultipleBlogs = [
    {
      _id: "622a7384564fc8b99af95c68",
      title: "ggg",
      author: "Jim",
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
      author: "fred",
      likes: 23,
      __v: 0
    }
  ]

  const test3 = {
    author: 'Jim',
    likes: 345
  }


  const listWithBlogsWithoutLikes = [
    {
      _id: "622a7384564fc8b99af95c68",
      title: "ggg",
      author: "fred",
      url: "www.blog.com",
      likes: 345,
      __v: 0
    },
    {
      _id: "622a739e564fc8b99af95c6b",
      title: "kfkag",
      author: "bill",
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
      _id: "622a7336564fc8b99af67868",
      title: "ggg",
      author: "James",
      likes: 23,
      __v: 0
    }
  ]

 const test4 = {
  author: 'fred',
  likes: 345
 }

  const listWithTwoEqualMaxValues = [
    {
      _id: "622a7384564fc8b99af95c68",
      title: "ggg",
      author: "Steve",
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
      author: "Sam",
      likes: 345,
      __v: 0
    },
    {
      _id: "622a7336564fc8b99af7897896",
      title: "ggg",
      author: "hugh",
      likes: 23,
      __v: 0
    }
  ]
  const test5 = {
    author: 'Steve,Sam',
    likes: 345
  }


  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual(test1)
  })
  test('when list has only one blog without likes', () => {
    const result = listHelper.mostLikes(listWithOneBlogWithoutLikes)
    expect(result).toEqual(test2)
  })
  test('works with multiple blogs', () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs)
    expect(result).toEqual(test3)
  })
  test('works when some blogs don\'t have likes', () => {
    const result = listHelper.mostLikes(listWithBlogsWithoutLikes)
    expect(result).toEqual(test4)
  })
  test('works when two entries have the same maximum value', () => {
    const result = listHelper.mostLikes(listWithTwoEqualMaxValues)
    expect(result).toEqual(test5)
  })
})