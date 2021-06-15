const {userModel} = require('../models/users')
const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports  = {
    findUserByEmail: async(req,res) => {
        try {
            const user = await userModel.findOne({email:req.body.email})
            return user
        } catch (err) {
            console.log(err)
            res.redirect('/users/signup')
            return
        }
    },
    createUser: async(req,res) => {
        const generatedHash = await bcrypt.hash(req.body.password,saltRounds)
        try {
            const createdUser = await userModel.create({
                user:req.body.user,
                email:req.body.email,
                hash:generatedHash,
                role: 'user',
            })
            return createdUser
        } catch (err) {
            console.log(err)
            res.redirect('/user/login')
        }
    },
    findUserByUser: async(req,res) => {
        try {
            const user = await userModel.findOne({ user: req.body.user })
            return user
        } catch(err) {
            console.log(err)
            res.redirect('/users/signup')
            return
        }
    }
}