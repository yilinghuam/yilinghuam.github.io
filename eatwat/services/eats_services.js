const {eatModel} = require('../models/eats')
const _ = require('lodash')


module.exports = {
    findAll: async(req,res) => {
        try {
            const eats = await eatModel.find({user:req.session.user.user})

            //  if no data, redirect to add data
            if(!eats) {
                res.redirect('/eats/new')
            }else{
                return eats
            }

        } catch (err) {
            res.statusCode = 500
            return `error finding all eat data`
        }
    },

    findOne: async(req,res) => {
        try {
            const singleEat = await eatModel.findOne({slug:req.params.slug,user:req.session.user.user})
            
            //  if eat is not found
            if (!singleEat) {
                res.redirect('/eats')
            }else {
                return singleEat
            }

        } catch (err) {
            console.log(err)
            res.redirect('/eats/')
            return `failure to find single data`
        }

    },

    create: async(req,res,imageURL) => {
        const {placeName, slug, address} = processPlaceNameAndAddress(req)

        try {
            const eatCreation = await eatModel.create({
                placeName: placeName,
                slug: slug,
                address: address,
                coordinates:req.body.coordinates,
                mrt: req.body.mrt,
                ratings: Number(req.body.ratings),
                price: Number(req.body.price),
                category: req.body.tags,
                comments: req.body.comments,
                image: imageURL,
                user: req.session.user.user
            })

        } catch (err) {
            console.log(err)
            res.redirect('/eats/new')
            return  `single data insertion error`
        }
    }
}

function processPlaceNameAndAddress(req) {
    let placeNameAndAddress = req.body.placeNameAndAddress
    let index = placeNameAndAddress.indexOf(',')
    let placeNameAndAddressArray = [placeNameAndAddress.substring(0,index),placeNameAndAddress.substring(index+1)] 
    
    let placeName = placeNameAndAddressArray[0]
    let slug = _.kebabCase(placeName)
    let address = placeNameAndAddressArray[1]
    
    let placeNameAndAddressObject = {placeName,slug,address}
    return placeNameAndAddressObject
}
