require('dotenv').config()
const mongoose = require('mongoose')
const {eatModel} = require('../models/eats')
const _ = require('lodash')

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`

let data = [
    {
        placeName: 'Shake Shack',
        address: '89 Neil Road, Singapore, Central 088849, Singapore',
        coordinates:'103.841661,1.278472',
        mrt: 'Outram Park',
        ratings: 3,
        price: 3,
        category: 'Fast Food',
    },
    {
        placeName: 'Yan Palace Restaurant 燕阁大酒楼',
        address: '#01-49 Hong Lim Complex, Singapore, Central 048421, Singapore',
        coordinates:'103.846364,1.284219',
        mrt: 'Chinatown',
        ratings: 2,
        price: 4,
        category: 'Chinese',
        comments: 'great duck, will come back here again'
    },
    {
        placeName: 'Wild Honey',
        address: '#03-01, Mandarin Gallery, Singapore, Central 238862, Singapore',
        coordinates:'103.83510799999999,1.303839',
        mrt: 'Somerset',
        ratings: 5,
        price: 4,
        category: 'Brunch',
        comments: 'Food is so so so so so so so so so good. Will always come for the coffee'
    },
]

data = data.map(element => {
    element.slug = _.kebabCase(element.placeName)
    return element
})

let connection = null

mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then(connResp => {
    connection = connResp
    return eatModel.insertMany(data)
  })
  .then(insertResp => {
      console.log('successful data insertion')
  })
  .catch(err => {
    console.log(err)
  })
  .finally(() => {
    if (connection !== null) {
        connection.disconnect()
    }
})