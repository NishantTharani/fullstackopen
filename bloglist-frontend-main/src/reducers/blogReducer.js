import blogService from "../services/blogs"

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data

    case 'ADD_BLOG':
      return [...state, action.data]

    default:
      return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const addBlog = (blogObj) => {
  return async dispatch => {
    const blogData = await blogService.createBlog(blogObj)
    dispatch({
      type: 'ADD_BLOG',
      data: blogData
    })
  }
}


export default reducer