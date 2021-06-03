
const {eatModel} = require('../models/eats')
const _ = require('lodash')

const mrtStations = require('../data/MRT_stations')

module.exports = {
    index: async(req,res) => {
        let eats =[]

        try {
            eats = await eatModel.find()
        } catch (err) {
            res.statusCode = 500
            return `server error`
        }
        console.log(eats)
        res.render('index', {eats: eats})
    },

    newEat: (req,res) => {
        res.render('new', {mrtStations : mrtStations})
    },

    create: async(req,res) => {
        console.log(req.body)
        let placeNameAndAddress = req.body.placeNameAndAddress
        let index = placeNameAndAddress.indexOf(',')
        let placeNameAndAddressArray = [placeNameAndAddress.substring(0,index),placeNameAndAddress.substring(index+1)] 
        console.log(placeNameAndAddressArray)

        try {
            const eatCreation = await eatModel.create({
                placeName: placeNameAndAddressArray[0],
                slug: _.kebabCase(placeNameAndAddress[0]),
                address: placeNameAndAddressArray[1],
                coordinates:req.body.coordinates,
                mrt: req.body.mrt,
                ratings: Number(req.body.ratings),
                price: Number(req.body.price),
                category: req.body.tags,
                comments: req.body.comments,
            })
            console.log(eatCreation)
        } catch (err) {
            console.log(err)
            res.statusCode = 500
            res.redirect('/eats/new')
            return  `single data insertion error`
        }
        res.redirect('/eats')
    },

    show: (req,res) => {
        
    }
}