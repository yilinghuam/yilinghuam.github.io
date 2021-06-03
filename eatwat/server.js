require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')
const eatController = require('./controllers/eats_controller')


const app = express();
const port = 3000;

app.set('view engine', 'ejs')

app.get('/eats', eatController.index)

app.get('/eats/mapSearch', (req,res) => {
    res.render('mapSearch')
})

app.get('/eats/new', (req,res) => {
    res.render('new')
})

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`

mongoose
    .connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then( response => {
        app.listen(port, () => {
            console.log('eatwat app connected to mongo')
        })
    })