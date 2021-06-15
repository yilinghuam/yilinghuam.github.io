const bcrypt = require('bcrypt')
const saltRounds = 10
const userServices = require('../services/user_services')

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
            res.redirect('/users/signup')
            return
        }
        // validate if form is empty
        if (!req.body.password || !req.body.confirm_password || !req.body.user || !req.body.email) {
            res.redirect('/users/signup')
            return
        }

        let user = null
        user = await userServices.findUserByEmail(req,res)
 
        //return if user email already used
        if (user) {
            res.redirect('/users/signup')
            return
        }
        
        const createdUser = await userServices.createUser(req,res)
        res.redirect('/eats')
    },
    
    loginUser: async(req,res) => {
        let user = null
        user = await userServices.findUserByUser(req,res)

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
