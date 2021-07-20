require('dotenv').config()

let PORT = 3003

let MONGODB_URI = process.env.NODE_ENV === 'test'
  ? 'mongodb://localhost:27017/bloglistTest'
  :'mongodb://localhost:27017/bloglist'

module.exports = {
  MONGODB_URI,
  PORT
}