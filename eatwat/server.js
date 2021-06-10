require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')
const methodOverride = require('method-override')
var multer  = require('multer')
const fileUpload = multer()

const mapAccessToken = `${process.env.MAPBOX_TOKEN}`

const eatController = require('./controllers/eats_controller')
const mapsearchController = require('./controllers/mapsearch_controller')

const app = express();
const port = 3000;
const _ = require('lodash')
// mongoDB info
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))



app.set('view engine', 'ejs')

app.get('/eats', eatController.index)

app.get('/eats/new', eatController.newEat)

app.post('/eats',fileUpload.single('image'), eatController.create)

app.get('/eats/:slug', eatController.show)

app.get('/eats/:slug/edit', eatController.edit)

app.patch('/eats/:slug',fileUpload.single('image'),eatController.update)

app.delete('/eats/:slug',eatController.delete)



app.get('/mapsearch', mapsearchController.index)
app.post('/mapsearch', mapsearchController.create)
app.get('/mapsearch/:mrt', mapsearchController.show)











mongoose
    .connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then( response => {
        app.listen(port, () => {
            console.log('eatwat app connected to mongo')
        })
    })