import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getUsers = () => {
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



export default { setToken, getUsers }