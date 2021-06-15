require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')
const methodOverride = require('method-override')
var multer  = require('multer')
const fileUpload = multer()
const session = require('express-session')
const mapAccessToken = `${process.env.MAPBOX_TOKEN}`

const eatController = require('./controllers/eats_controller')
const mapsearchController = require('./controllers/mapsearch_controller')
const dashboardController = require('./controllers/dashboard_controller')
const userController = require('./controllers/user_controller')
const { authenticatedOnly, adminOnly, setUserVarMiddleware, guestOnly } = require('./middlewares/auth-middleware')


const app = express();
const port = 3000;
const _ = require('lodash')
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

app.get('/eats', authenticatedOnly, eatController.index)
app.get('/eats/new', authenticatedOnly,eatController.newEat)
app.post('/eats', authenticatedOnly, fileUpload.single('image'), eatController.create)
app.get('/eats/random', authenticatedOnly, eatController.showRandom) // random
app.get('/eats/:slug', authenticatedOnly, eatController.show)
app.get('/eats/:slug/edit', authenticatedOnly,eatController.edit)
app.patch('/eats/:slug', authenticatedOnly, fileUpload.single('image'),eatController.update)
app.delete('/eats/:slug', authenticatedOnly, eatController.delete)

// mapsearch routes
app.get('/mapsearch', authenticatedOnly, mapsearchController.index)
app.post('/mapsearch', authenticatedOnly, mapsearchController.create)
app.get('/mapsearch/:mrt', authenticatedOnly, mapsearchController.show)

// dashboard routes
app.get('/dashboard', adminOnly, dashboardController.index)
app.get('/dashboard/:cat', adminOnly, dashboardController.show)
app.post('/dashboard/:cat', adminOnly, dashboardController.create)
app.get('/dashboard/:cat/new', adminOnly, dashboardController.newItem)
app.get('/dashboard/:cat/:item/edit', adminOnly, dashboardController.edit)
app.patch('/dashboard/:cat/:item', adminOnly, dashboardController.update)
app.delete('/dashboard/:cat/:item', adminOnly, dashboardController.delete)

// user routes
app.get('/users/login', guestOnly, userController.login)
app.get('/users/signup', guestOnly, userController.signup)
app.post('/users/signup', guestOnly, userController.create)
app.post('/users/login', guestOnly, userController.loginUser)
app.get('/users/logout', authenticatedOnly, userController.logout)


mongoose
    .connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then( response => {
        app.listen(port, () => {
            console.log('eatwat app connected to mongo')
        })
    })