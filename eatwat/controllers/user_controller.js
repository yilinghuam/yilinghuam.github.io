const {userModel} = require('../models/users')
const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {
    login: (req,res) => {
        res.render('users/login')
    },
    signup: (req,res) => {
        res.render('users/signup')
    },
    create: async(req,res) => {
        //ensure password matches
        if(req.body.password !== req.body.confirm_password){
            res.redirect('users/signup')
            return
        }

        let user = null

        try {
            user = await userModel.findOne({email:req.body.email})
        } catch (err) {
            console.log(err)
            res.redirect('/users/signup')
            return
        }
        //return if user email already used
        if (user) {
            res.redirect('users/signup')
            return
        }

        const generatedHash = await bcrypt.hash(req.body.password,saltRounds)
        try {
            await userModel.create({
                user:req.body.user,
                email:req.body.email,
                hash:generatedHash,
                role: 'user',
            })
        } catch (err) {
            console.log(err)
            res.redirect('/user/login')
        }
        res.redirect('/eats')
    },
    
    loginUser: async(req,res) => {
        let user = null

        try {
            user = await userModel.findOne({ user: req.body.user })
        } catch(err) {
            console.log(err)
            res.redirect('/users/signup')
            return
        }

        if (!user) {
            res.redirect('/users/signup')
            return
        }
        const isValidPassword = await bcrypt.compare(req.body.password, user.hash)
        if (!isValidPassword) {
            res.redirect('/users/login')
            return
        }

        req.session.user = user

        res.redirect('/eats')
        
    },

    logout: (req, res) => {
        req.session.destroy()
        res.redirect('/users/login')
    }
}
