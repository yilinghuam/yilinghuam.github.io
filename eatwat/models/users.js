const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        user: { type: String, required: true, max: 100 },
        email: { type: String, required: true, unique: true, max: 100 },
        role: { type: String, required: true},
        hash: { type: String, required: true },
          },
  {timestamps:true})

const userModel = mongoose.model('User', userSchema)

module.exports = {
    userModel: userModel
}
