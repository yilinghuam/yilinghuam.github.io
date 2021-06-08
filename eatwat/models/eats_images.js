const mongoose = require('mongoose')

const eatImageSchema = new mongoose.Schema({
    // placeName, address and coordinates obtained via api
    placeName: {type: String, required: true},
    slug: {type: String, required: true},
    url: {type:String, required: true}
}, {timestamps:true})

const eatImageModel = mongoose.model('eatImage',eatImageSchema)

module.exports = {eatImageModel}