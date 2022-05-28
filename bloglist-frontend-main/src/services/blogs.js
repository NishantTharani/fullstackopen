import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  if (token !== null) {
    const request = axios.get(baseUrl, {
      headers: {
        Authorization: token
      }
    })
    return request.then(response => response.data)
  } else {
    return Promise.resolve([])
  }
}

const addBlogComment = (blogId, commentObj) => {
  if (token !== null) {
    const request = axios.post(`${baseUrl}/${blogId}/comments`, commentObj, {
      headers: {
        Authorization: token
      }
    })

    return request.then(response => response.data)
  }
}

const createBlog = (newBlog) => {
  if (token !== null) {
    const request = axios.post(baseUrl, newBlog,{
      headers: {
        Authorization: token
      }
    })
    return request.then(response => response.data)
  }
}

const deleteBlog = (blogId) => {
  if (token !== null) {
    const request = axios.delete(`${baseUrl}/${blogId}`, {
      headers: {
        Authorization: token
      }
    })
    return request.then(response => response.data)
  }
}

const getBlog = (blogId) => {
  if (token !== null) {
    const request = axios.get(`${baseUrl}/${blogId}`, {
      headers: {
        Authorization: token
      }
    })
    return request.then(response => response.data)
  } else {
    return null
  }
}

export default { getAll, setToken, createBlog, deleteBlog, getBlog, addBlogComment }