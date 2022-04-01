const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
    .filter(likes => likes)
  console.log(likes)
  return likes.reduce((previous, current) => previous + current, 0)
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
    .filter(likes => likes)
  const maxLikes = Math.max(...likes)
  return likes.length === 0
  ? blogs
  : blogs.filter(blog => blog.likes === maxLikes)
}

const mostBlogs = (blogs) => {
  const authors = blogs.map(blog => blog.author)
  const highestAuthor = [...authors].sort((previous, current) => {
    authors.filter(author => author === previous).length -
    authors.filter(author => author === current).length 
  }).pop()
  const maxValue = authors.filter(author => author === highestAuthor).length
  const allAuthors = []  
  const authorsCopy = [...authors]
  for (;;) {
    let findAllAuthors = authorsCopy.sort((previous, current) => {
      authors.filter(author => author === previous).length -
      authors.filter(author => author === current).length 
    }).pop()
    if (authors.filter(author => author === findAllAuthors).length !== maxValue) break 
    if (!allAuthors.includes(findAllAuthors)) {
      allAuthors.push(findAllAuthors)
    }
  }
  console.log(allAuthors)
  const authorObject = {
    author: allAuthors,
    blogs: maxValue
  }
  return authorObject
}

const mostLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
    .filter(likes => likes)
  const maxLikes = Math.max(...likes)
  const mostLikedBlogs = likes.length === 0
  ? blogs
  : blogs.filter(blog => blog.likes === maxLikes)
  const mostLikedBlogsAuthor = mostLikedBlogs.map(blog => blog.author)
  const authorToReturn = mostLikedBlogsAuthor.length === 1
  ? mostLikedBlogsAuthor[0]
  : mostLikedBlogsAuthor
  const blogObject = {
    author: `${authorToReturn}`,
    likes: likes.length === 0 ? 0 : mostLikedBlogs[0].likes
  }
  return blogObject
}

module.exports = {
  dummy, 
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
