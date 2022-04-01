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
      _id: "622a7336564fc8b99af67868",
      title: "ggg",
      author: "Cole",
      likes: 23,
      __v: 0
    }
  ]

  const mostLikedBlog = [
    {
      _id: "622a7384564fc8b99af95c68",
      title: "ggg",
      author: "Cole",
      url: "www.blog.com",
      likes: 345,
      __v: 0
    }
  ]

  const listWithTwoEqualMaxValues = [
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
      author: "Sam",
      likes: 345,
      __v: 0
    },
    {
      _id: "622a7336564fc8b99af7897896",
      title: "ggg",
      author: "Cole",
      likes: 23,
      __v: 0
    }
  ]

  const mostLikes_sameValue = [
    {
      _id: "622a7384564fc8b99af95c68",
      title: "ggg",
      author: "Cole",
      url: "www.blog.com",
      likes: 345,
      __v: 0
    },
    {
      _id: "622a7336564fc8b99af95c65",
      title: "ggg",
      author: "Sam",
      likes: 345,
      __v: 0
    }
  ]


  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog)
  })
  test('when list has only one blog without likes', () => {
    const result = listHelper.favoriteBlog(listWithOneBlogWithoutLikes)
    expect(result).toEqual(listWithOneBlogWithoutLikes)
  })
  test('works with multiple blogs', () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    expect(result).toEqual(mostLikedBlog)
  })
  test('works when some blogs don\'t have likes', () => {
    const result = listHelper.favoriteBlog(listWithBlogsWithoutLikes)
    expect(result).toEqual(mostLikedBlog)
  })
  test('works when two entries have the same maximum value', () => {
    const result = listHelper.favoriteBlog(listWithTwoEqualMaxValues)
    expect(result).toEqual(mostLikes_sameValue)
  })
})