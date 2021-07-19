require('dotenv').config()

let PORT = 3003;
let MONGODB_URI = 'mongodb://localhost:27017/bloglist';

module.exports = {
    MONGODB_URI,
    PORT
}