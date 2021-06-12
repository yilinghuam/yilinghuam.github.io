const mongoose = require('mongoose')

const formDataSchema = new mongoose.Schema({
    category: {type: Object, required: true},
    ratings: {type: Object, required: true},
    price: {type: Object, required: true},
    slug: {type:String, required:true}
}, {timestamps:true})

const formDataModel = mongoose.model('formData', formDataSchema)

module.exports = {formDataModel}