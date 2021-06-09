const mongoose = require('mongoose')

const mrtSchema = new mongoose.Schema({
    // placeName, address and coordinates obtained via api
    station: {type: String, required: true},
    slug: {type: String, required: true},
    coordinates: {type: String, required: true}
}, {timestamps:true})

const mrtModel = mongoose.model('mrt', mrtSchema)

module.exports = {mrtModel}