
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blogPost) => {
    return sum + blogPost.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((prev, current) => {
    return (current.likes > prev.likes ? current : prev)
  })

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  let authors = {}

  blogs.forEach(blog => {
    blog.author in authors ? authors[blog.author]++ : authors[blog.author] = 1
  })

  const author = Object.keys(authors).reduce((a, b) => {
    return authors[a] > authors[b] ? a : b
  })

  return {
    author: author,
    blogs: authors[author]
  }
}

const mostLikes = (blogs) => {
  let authors = {}

  blogs.forEach(blog => {
    blog.author in authors ? authors[blog.author] += blog.likes : authors[blog.author] = blog.likes
  })

  const author = Object.keys(authors).reduce((a, b) => {
    return authors[a] > authors[b] ? a : b
  })

  return {
    author: author,
    likes: authors[author]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}