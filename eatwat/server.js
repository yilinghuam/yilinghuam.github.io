require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')
const eatController = require('./controllers/eats_controller')
const methodOverride = require('method-override')
const cloudinary = require('cloudinary')


const mapAccessToken = `${process.env.MAPBOX_TOKEN}`

const app = express();
const port = 3000;
const _ = require('lodash')
// mongoDB info
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`
//cloudinary
CLOUDINARY_URL='cloudinary://869492295862385:9f2lC9Tl_paB8N8oz6wscC0_VPo@dct3wrzog'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

const fileUpload = require('express-fileupload');
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


app.set('view engine', 'ejs')

app.get('/eats', eatController.index)

app.get('/eats/new', eatController.newEat)

app.post('/eats',eatController.create)

app.get('/eats/mapSearch', (req,res) => {
    res.render('mapSearch',{mapAccessToken: mapAccessToken })
})

app.get('/eats/:slug', eatController.show)

app.get('/eats/:slug/edit', eatController.edit)

app.patch('/eats/:slug',eatController.update)

app.delete('/eats/:slug',eatController.delete)








mongoose
    .connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then( response => {
        app.listen(port, () => {
            console.log('eatwat app connected to mongo')
        })
    })