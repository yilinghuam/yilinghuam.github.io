require('dotenv').config()
const _ = require('lodash')
const mapAccessToken = `${process.env.MAPBOX_TOKEN}`
const mrtServices = require('../services/mrt_services')
const eatServices = require ('../services/eats_services')
const formServices = require('../services/form_services')

module.exports = {
    index: async(req,res) => {
        let mrtStations =[]
        mrtStations = await mrtServices.getmrt(res)

        res.render(
            'mapsearch/index',
            {mrtStations: mrtStations})},

    create: (req,res) => {
        let mrt = _.kebabCase(req.body.mrt)
        res.redirect('/mapsearch/'+mrt)
    },

    show: async(req,res) => {
        let formData = {}
        let mrtStations = {}
        let eats = []
        let item = req.params.mrt
        
        formData = await formServices.getForm(res)
        mrtStations = await mrtServices.findOneItem(req,res,item)
        const station = mrtStations.station
        eats = await eatServices.findByMRT(req,res,station)

        // if no results, redirect
        if (eats.length === 0) {
            res.redirect('/mapsearch')
            return
        }
        res.render(
            'mapsearch/show', 
            {mapAccessToken:mapAccessToken,
            mrtStations: mrtStations,
            formData:formData,
            eats:eats})
    }
}