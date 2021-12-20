import axios from 'axios'
const baseUrl = '/api/userlikes'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const likeBlog = (blogId) => {
  if (token !== null) {
    const request = axios.post(`${baseUrl}/${blogId}`, null,{
      headers: {
        Authorization: token
      }
    })
    return request.then(response => response.data)
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


export default { setToken, likeBlog, unLikeBlog }