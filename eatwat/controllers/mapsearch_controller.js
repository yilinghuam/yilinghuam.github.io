require('dotenv').config()

const _ = require('lodash')
const mapAccessToken = `${process.env.MAPBOX_TOKEN}`

const {eatModel} = require('../models/eats')
const {mrtModel} = require('../models/mrt')
const {formDataModel} = require('../models/formdata')

module.exports = {
    index: async(req,res) => {
        let mrtStations =[]

        try {
            mrtStations = await mrtModel.find()
        } catch (err) {
            res.statusCode = 500
            return `server error`
        }
        res.render(
            'mapsearch/index',
            {mrtStations: mrtStations})},

    create: (req,res) => {
        let mrt = _.kebabCase(req.body.mrt)
        console.log(mrt)

        res.redirect('/mapsearch/'+mrt)
    },

    show: async(req,res) => {
        let query = req.params.mrt
        console.log(query)
        let mrtStations = {}
        let eats = []
        let formData = {}

        try {
            mrtStations = await mrtModel.findOne({slug:query})   
            formData = await formDataModel.findOne() 
        } catch (err) {
            res.statusCode = 500
            return `query server error`
        }

        try {
            eats = await eatModel.find({mrt:mrtStations.station},{ '_id': 0,'createdAt':0, 'updatedAt':0})
        } catch (err) {
            
        }
        console.log(eats)


        // if no results, redirect
        if (eats.length === 0) {
            res.redirect('/mapsearch')
            console.log('empty')
        }
        res.render(
            'mapsearch/show', 
            {mapAccessToken:mapAccessToken,
                mrtStations: mrtStations,
                formData:formData,
            eats:eats})
    }
    
}