require('dotenv').config()
const {eatModel} = require('../models/eats')
const _ = require('lodash')

const mapAccessToken = `${process.env.MAPBOX_TOKEN}`
const mrtStations = require('../data/MRT_stations')
const {category,ratings, price} = require('../data/form_data')

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
        res.render('eats/index', {eats: eats})
    },

    newEat: (req,res) => {
        res.render('eats/new', 
            {mrtStations : mrtStations,
            category:category,
            ratings: ratings,
            price:price,
            mapAccessToken: mapAccessToken})
    },

    create: async(req,res) => {
        const placeNameAndAddressArray = processPlaceNameAndAddress(req)

        try {
            const eatCreation = await eatModel.create({
                placeName: placeNameAndAddressArray[0],
                slug: _.kebabCase(placeNameAndAddressArray[0]),
                address: placeNameAndAddressArray[1],
                coordinates:req.body.coordinates,
                mrt: req.body.mrt,
                ratings: Number(req.body.ratings),
                price: Number(req.body.price),
                category: req.body.tags,
                comments: req.body.comments,
            })

        } catch (err) {
            console.log(err)
            res.statusCode = 500
            res.redirect('/eats/new')
            return  `single data insertion error`
        }
        res.redirect('/eats')
    },

    show: async(req,res) => {
        let singleEat = {}

        try {
            singleEat = await eatModel.findOne({slug:req.params.slug})

        } catch (err) {
            console.log(err)
            res.redirect('/eats/')
            return `failure to find single data`
        }
        res.render('eats/show',
            {
            mapAccessToken: mapAccessToken,
            singleEat: singleEat
        })
    },

    edit: async(req,res) => {
        let singleEat = {}

        try {
            singleEat = await eatModel.findOne({slug: req.params.slug})
        } catch (err) {
            console.log(err)
            res.redirect('/eats/'+req.params.slug)
            return `failure to find single data`
        }
        res.render('eats/edit', 
            {
                singleEat:singleEat,
                mrtStations : mrtStations,
                category:category,
                ratings:ratings,
                price: price,
                mapAccessToken: mapAccessToken
            })
    },

    update: async(req,res) => {
        const placeNameAndAddressArray = processPlaceNameAndAddress(req)

        try {
            const singleEatUpdate = await eatModel.updateOne(
                {slug: req.params.slug},
                {
                    placeName: placeNameAndAddressArray[0],
                    slug: _.kebabCase(placeNameAndAddressArray[0]),
                    address: placeNameAndAddressArray[1],
                    coordinates:req.body.coordinates,
                    mrt: req.body.mrt,
                    ratings: Number(req.body.ratings),
                    price: Number(req.body.price),
                    category: req.body.tags,
                    comments: req.body.comments,
                }
            )
        } catch (err) {
            console.log(err)
            res.statusCode = 500
            res.redirect('/eats/'+req.params.slug)
            return  `single data update error`
        }
        res.redirect('/eats')
    },

    delete: async (req,res) => {
        try {
            const singleEatDelete = await eatModel.deleteOne({slug: req.params.slug})
        } catch (err) {
            console.log(err)
            res.statusCode = 500
            res.redirect('/eats/'+req.params.slug)
            return  `single data delete error`
        }
        res.redirect('/eats')
    }
}

function processPlaceNameAndAddress(req) {
    let placeNameAndAddress = req.body.placeNameAndAddress
    let index = placeNameAndAddress.indexOf(',')
    let placeNameAndAddressArray = [placeNameAndAddress.substring(0,index),placeNameAndAddress.substring(index+1)] 
    return placeNameAndAddressArray
}