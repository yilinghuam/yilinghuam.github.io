const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs')

app.get('/eats', (req,res) => {
    res.render('mapSearch')
})

app.get('/eats/new', (req,res) => {
    res.render('new')
})

app.listen(port, () => {
    console.log(`eatwat app listening on port: ${port}`)
})