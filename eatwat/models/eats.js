const mongoose = require('mongoose')

const eatSchema = new mongoose.Schema({
    // placeName, address and coordinates obtained via api
    placeName: {type: String, required: true},
    slug: {type:String, required: true},
    address: {type: String, required: true},
    coordinates:{type: String, required: true},
    // to be filled in by user
    mrt: {type: String, required: true},
    ratings: {type: Number, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true},
    comments: {type: String, required: false},
}, {timestamps:true})

const eatModel = mongoose.model('eat',eatSchema)

module.exports = {eatModel}