require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')

const {setUserVarMiddleware} = require('./middlewares/auth-middleware')
const eatsRouter = require('./routers/eats_router')
const dashboardRouter = require('./routers/dashboard_router')
const userRouter = require('./routers/user_router')
const mapsearchRouter = require('./routers/mapsearch_router')


const app = express();
const port = 3000;

// mongoDB info
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
    secret: `${process.env.SESSION_SECRET}`,
    name: 'user_session',
    resave: false,
    saveUninitialized: false,
    cookie: { path: '/', secure: false, maxAge: 3600000 } // 3600000ms = 3600s = 60mins, cookie expires in an hour
}))


app.set('view engine', 'ejs')
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
app.use(setUserVarMiddleware)

// redirect from homepage
app.get('/',(req,res) => {
    res.redirect('/users/login')
})

// eat routes
app.use('/eats',eatsRouter)

// mapsearch routes
app.use('/mapsearch',mapsearchRouter)

// dashboard routes
app.use('/dashboard',dashboardRouter)

// user routes
app.use('/users',userRouter)


mongoose
    .connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then( response => {
        app.listen(port, () => {
            console.log('eatwat app connected to mongo')
        })
    })