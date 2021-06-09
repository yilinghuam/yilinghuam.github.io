require('dotenv').config()
const mongoose = require('mongoose')
const {mrtModel} = require('../models/mrt')
const _ = require('lodash')
const mrt = require('../data/mrt_data')

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`

let data = []

let mrtKeys = Object.keys(mrt)

mrtKeys.map(element => {
    data.push({
        station: element,
        slug: _.kebabCase(element),
        coordinates: mrt[element].toString()
    })
})
console.log(data)

let connection = null

mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then(connResp => {
    connection = connResp
    return mrtModel.insertMany(data)
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