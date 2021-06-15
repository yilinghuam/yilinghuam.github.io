const {eatModel} = require('../models/eats')
const _ = require('lodash')


module.exports = {
    findAll: async(req,res) => {
        try {
            const eats = await eatModel.find({user:req.session.user.user})
            return eats
        } catch (err) {
            res.statusCode = 500
            return `error finding all eat data`
        }
    },

    findOne: async(req,res) => {
        try {
            const singleEat = await eatModel.findOne({slug:req.params.slug,user:req.session.user.user})
            return singleEat
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
                user: [req.session.user.user,'admin']
            })

        } catch (err) {
            console.log(err)
            res.redirect('/eats/new')
            return  `single data insertion error`
        }
    },
    updateWithImage: async(req,res,imageURL) => {
        const {placeName, slug, address} = processPlaceNameAndAddress(req)

        try {
            const singleEatUpdate = await eatModel.updateOne(
                {slug: req.params.slug},
                {
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
                    user: [req.session.user.user,'admin']
                }
            )
            return singleEatUpdate
        } catch (err) {
            console.log(err)
            res.statusCode = 500
            res.redirect('/eats/'+req.params.slug)
            return  `single data update error`
        }
    },
    updateWithoutImage: async(req,res) => {
        const {placeName, slug, address} = processPlaceNameAndAddress(req)

        try {
            const singleEatUpdate = await eatModel.updateOne(
                {slug: req.params.slug},
                {
                    placeName: placeName,
                    slug: slug,
                    address: address,
                    coordinates:req.body.coordinates,
                    mrt: req.body.mrt,
                    ratings: Number(req.body.ratings),
                    price: Number(req.body.price),
                    category: req.body.tags,
                    comments: req.body.comments,
                    user: [req.session.user.user,'admin']
                }
            )
        } catch (err) {
            console.log(err)
            res.statusCode = 500
            res.redirect('/eats/'+req.params.slug)
            return  `single data update error`
        }
    },
    deleteOne: async(req,res) => {
        try {
            const singleEatDelete = await eatModel.deleteOne({slug: req.params.slug})
        } catch (err) {
            console.log(err)
            res.statusCode = 500
            res.redirect('/eats/'+req.params.slug)
            return  `single data delete error`
        }
    },
    getRandom: async(req,res) => {
        try {
            //random 4 options
            const eats = await eatModel.aggregate([{$match:{user:req.session.user.user}},{$sample:{size:4}}])
            return eats
        } catch (err) {
            console.log(err)
            res.statusCode = 500
            return  `data aggregation error`
        }
    },
    findByMRT: async(req,res,station) => {
        console.log(mrtStations)
        try {
            const eats = await eatModel.find({mrt:station,user:req.session.user.user},{ '_id': 0,'createdAt':0, 'updatedAt':0})
            console.log(eats)
            return eats
        } catch (err) {
            res.statusCode = 500
            res.redirect('/mapsearch')
            return  `data according to mrt error`
        }
    },
    updateByStation: async(req,res,station,originalStation) => {
        try {
            const replacedEatsData = await eatModel.updateMany({mrt:originalStation},{mrt:station})
            return replacedEatsData
        } catch (err) {
            console.log(err)
            res.statusCode = 500
            return `eat replacement error`
        }
    },
    updateByCategory: async(res,item,newkey) => {
        try {
            const replacedEatsData = await eatModel.updateMany({category:item},{category:newkey})
            return replacedEatsData
        } catch (err) {
            console.log(err)
            res.statusCode = 500
            return `eat replacement error`
        }
    },
    updateByRatingsPrice: async(res,item,newkey,query) =>{
        try {
            const replacedEatsData = await eatModel.updateMany({[query]:Number(item)},{[query]:Number(newkey)})
            return replacedEatsData
        } catch (err) {
            console.log(err)
            res.statusCode = 500
            return `eat replacement error`
        }
    },
    findByMRTAdmin: async(res,station) => {
        try {
            const eatsData = await eatModel.find({mrt:station})
            return eatsData
        } catch (err) {
            console.log(err)
            res.statusCode = 500
            return `eat replacement error`
        }
    },
    findByCategoryAdmin: async(res,item) => {
        try {
            const eatsData = await eatModel.find({category:item})
            return eatsData
        } catch (err) {
            console.log(err)
            res.statusCode = 500
            return `eat find error`
        }
    },
    findByRatingsPriceAdmin: async(res,query,item) => {
        try {
            const eatsData = await eatModel.find({[query]:Number(item)})
            return eatsData
        } catch (err) {
            console.log(err)
            res.statusCode = 500
            return `eat find error`
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
