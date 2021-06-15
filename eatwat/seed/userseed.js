require('dotenv').config()
const mongoose = require('mongoose')
const {userModel} = require('../models/users')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const saltRounds = 10

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`
let password1 =''
let password2 = ''

let connection = null

let adduser = async() => {
    try {
        password1 = await bcrypt.hash('123',saltRounds)
        password2 = await bcrypt.hash('456',saltRounds)
        console.log(password1)
        console.log(password2)
    } catch (error) {
        
    }

    let data = [
        {
            user: 'admin',
            email: 'lingy93@gmail.com',
            role: 'admin',
            hash: password1,
          },
        {
            user: 'lingy',
            email: 'huamyiling@gmail.com',
            role: 'user',
            hash: password2,
        }]
    mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then(connResp => {
    connection = connResp
    
    return userModel.insertMany(data)
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
}
adduser()
