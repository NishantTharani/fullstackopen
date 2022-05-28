import blogService from "../services/blogs"
import userLikesService from "../services/userLikes"

const reducer = (state = [], action) => {
  let blogObj
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data

    case 'ADD_BLOG':
      return [...state, action.data]

    case 'ADD_BLOG_COMMENT':
      blogObj = state.find(blogObj => blogObj.id === action.blogId)
      return [
        ...state.filter(blogObj => blogObj.id !== action.blogId),
        {
          ...blogObj,
          comments: blogObj.comments.concat(action.data)
        }
      ]
        .sort((a, b) => (a.id > b.id) ? 1 : (a.id < b.id) ? -1 : 0)

    case 'TOGGLE_LIKE_BLOG':
      blogObj = state.find(blogObj => blogObj.id === action.blogId)
      return [...state.filter(blogObj => blogObj.id !== action.blogId),
        {
          ...blogObj,
          liked: !blogObj.liked
        }]
        .sort((a, b) => (a.id > b.id) ? 1 : (a.id < b.id) ? -1 : 0)

    case 'DELETE_BLOG':
      return [...state.filter(blogObj => blogObj.id !== action.blogId)]

    default:
      return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const likedBlogs = await userLikesService.getLikedBlogs()
    console.log(likedBlogs)

    blogs.forEach(blogObj => {
      blogObj['liked'] = likedBlogs.has(blogObj.id)
    })

    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const addBlog = (blogObj) => {
  return async dispatch => {
    const blogData = await blogService.createBlog(blogObj)
    blogData['liked'] = false
    dispatch({
      type: 'ADD_BLOG',
      data: blogData
    })
  }
}

export const addComment = (id, commentObj) => {
  return async dispatch => {
    const commentData = await blogService.addBlogComment(id, commentObj)
    dispatch({
      type: 'ADD_BLOG_COMMENT',
      data: commentData,
      blogId: id
    })
  }
}

export const toggleLikeBlog = (blogId) => {
  return async dispatch => {
    await userLikesService.toggleLikeBlog(blogId)
    dispatch({
      type: 'TOGGLE_LIKE_BLOG',
      blogId: blogId
    })
  }
}

export const deleteBlog = (blogId) => {
  return async dispatch => {
    const blogObj = await blogService.deleteBlog(blogId)
    dispatch({
      type: 'DELETE_BLOG',
      blogId: blogId
    })
  }
}



export default reducer