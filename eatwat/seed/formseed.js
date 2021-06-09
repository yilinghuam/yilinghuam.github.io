require('dotenv').config()
const mongoose = require('mongoose')
const {formDataModel} = require('../models/formdata')
const _ = require('lodash')
const {category, ratings, price} = require('../data/form_data')

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`

// let categoryData = []
// let ratingsData = []
// let priceData = []


// let categoryKeys = Object.keys(category)
// let ratingsKeys = Object.keys(ratings)
// let priceKeys = Object.keys(price)

// categoryKeys.map(element => {
//     categoryData.push({
//         value: element,
//         text: element,
//     })
// })
// ratingsKeys.map(element => {
//     ratingsData.push({
//         value: element,
//         text: ratings[element],
//     })
// })
// priceKeys.map(element => {
//     priceData.push({
//         value: element,
//         text: price[element],
//     })
// })

let data = {
    category: category,
    ratings: ratings,
    price: price,
}
console.log(data)

let connection = null

mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then(connResp => {
    connection = connResp
    return formDataModel.insertMany(data)
  })
  .then(insertResp => {
      console.log('successful mrt data insertion')
  })
  .catch(err => {
    console.log(err)
  })
  .finally(() => {
    if (connection !== null) {
        connection.disconnect()
    }
})