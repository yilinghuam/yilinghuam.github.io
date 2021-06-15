module.exports = {
    authenticatedOnly: (req, res, next) => {
        // if session is valid, go to the next stage
        if (req.session && req.session.user) {
            next()
            return
        }
        res.redirect('/users/login')
    },

    adminOnly: (req, res, next) => {
        if (!req.session || !req.session.user || !req.session.user.role) {
            res.redirect('/users/login')
            return
        }

        if (req.session.user.role === 'admin') {
            next()
            return
        }
        if (req.session && req.session.user) {
            res.redirect('/eats')
            return
        }
        
        res.redirect('/users/login')
    },
    guestOnly: (req,res,next) =>{
        if (!req.session || !req.session.user) {
            next()
            return
        }

        res.redirect('/eats')
    },

    setUserVarMiddleware: (req, res, next) => {
    res.locals.user = null

    if (req.session && req.session.user) {
        res.locals.user = req.session.user
    }
    next()
    },
}