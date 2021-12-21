import axios from 'axios'
const baseUrl = '/api/userlikes'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getLikedBlogs = () => {
  if (token !== null) {
    const request = axios.get(baseUrl, {
      headers: {
        Authorization: token
      }
    })
    return request.then(response => {
      const blogIds = response.data.map(userLikesObj => userLikesObj.blogId)
      return new Set(blogIds)
    })
  }
}

const toggleLikeBlog = (blogId) => {
  if (token !== null) {
    const request = axios.post(`${baseUrl}/${blogId}`, null,{
      headers: {
        Authorization: token
      }
    })
    return request.then(response => response)
  }
}

const unLikeBlog = (blogId) => {
  if (token !== null) {
    const request = axios.delete(`${baseUrl}/${blogId}`, {
      headers: {
        Authorization: token
      }
    })
    return request.then(response => response.data)
  }
}


export default { getLikedBlogs, setToken, toggleLikeBlog, unLikeBlog }