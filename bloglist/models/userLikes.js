const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const userLikesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  blogId: {
    type: String,
    required: true,
  },

})

userLikesSchema.plugin(uniqueValidator)

const UserLikes = mongoose.model('UserLikes', userLikesSchema)

module.exports = UserLikes