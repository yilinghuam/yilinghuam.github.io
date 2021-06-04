require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')
const eatController = require('./controllers/eats_controller')
const methodOverride = require('method-override')

const mapAccessToken = `${process.env.MAPBOX_TOKEN}`

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs')

app.get('/eats', eatController.index)

app.get('/eats/new', eatController.newEat)

app.post('/eats', eatController.create)

app.get('/eats/mapSearch', (req,res) => {
    res.render('mapSearch',{mapAccessToken: mapAccessToken })
})

app.get('/eats/:slug', eatController.show)

app.get('/eats/:slug/edit', eatController.edit)





const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`

mongoose
    .connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then( response => {
        app.listen(port, () => {
            console.log('eatwat app connected to mongo')
        })
    })