require('dotenv').config()

const _ = require('lodash')
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
var multer  = require('multer')
const fileUpload = multer()

const mapAccessToken = `${process.env.MAPBOX_TOKEN}`

const {eatModel} = require('../models/eats')
const {mrtModel} = require('../models/mrt')
const {formDataModel} = require('../models/formdata')

module.exports = {
    index: async(req,res) => {
        let eats =[]
        let formData ={}

        try {
            eats = await eatModel.find()
            formData = await formDataModel.findOne()
        } catch (err) {
            res.statusCode = 500
            return `server error`
        }
        res.render('eats/index', {eats: eats,formData:formData})
    },

    newEat: async (req,res) => {
        let mrtStations =[]
        let formData = {}

        try {
            mrtStations = await mrtModel.find()
            formData = await formDataModel.findOne()
        } catch (err) {
            res.statusCode = 500
            return `server error`
        }
        console.log(formData)

        res.render('eats/new', 
            {mrtStations : mrtStations,
            formData: formData,
            mapAccessToken: mapAccessToken})
    },

    create: async(req,res) => {
        const placeNameAndAddressArray = processPlaceNameAndAddress(req)
        let placeName = placeNameAndAddressArray[0]
        let slug = _.kebabCase(placeName)
        let imageURL = ''

        
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                    {public_id: slug, //set option parameter
                        folder: 'eatwat'},
                  (error, result) => {
                    if (result) {
                        imageURL = result.url
                        resolve(result)
                    } else {
                      reject(error);
                    }
                  }
                );
        
               streamifier.createReadStream(req.file.buffer).pipe(stream);
            })
        }


        if(req.file !== undefined) {
            try {
                let result = await streamUpload(req);
            } catch (error) {
                console.log(error)
            }
        }
        

        // create model
        try {
            const eatCreation = await eatModel.create({
                placeName: placeName,
                slug: slug,
                address: placeNameAndAddressArray[1],
                coordinates:req.body.coordinates,
                mrt: req.body.mrt,
                ratings: Number(req.body.ratings),
                price: Number(req.body.price),
                category: req.body.tags,
                comments: req.body.comments,
                image: imageURL
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
        let formData = {}

        try {
            singleEat = await eatModel.findOne({slug:req.params.slug})
            formData = await formDataModel.findOne()
        } catch (err) {
            console.log(err)
            res.redirect('/eats/')
            return `failure to find single data`
        }
        res.render('eats/show',
            {
            mapAccessToken: mapAccessToken,
            singleEat: singleEat,
            formData:formData
        })
    },

    edit: async(req,res) => {
        let singleEat = {}
        let mrtStations =[]
        let formData = {}


        try {
            mrtStations = await mrtModel.find()
            formData = await formDataModel.findOne()
        } catch (err) {
            res.statusCode = 500
            return `server error`
        }

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
                formData: formData,
                mapAccessToken: mapAccessToken
            })
    },

    update: async(req,res) => {
        const placeNameAndAddressArray = processPlaceNameAndAddress(req)
        let placeName = placeNameAndAddressArray[0]
        let slug = _.kebabCase(placeName)

        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                    {public_id: slug, //set option parameter
                        folder: 'eatwat',
                        overwrite: true},
                  (error, result) => {
                    if (result) {
                        imageURL = result.url
                        resolve(result)
                    } else {
                      reject(error);
                    }
                  }
                );
        
               streamifier.createReadStream(req.file.buffer).pipe(stream);
            })
        }


        if(req.file !== undefined) {
            try {
                let imageURL = ''
                let result = await streamUpload(req);
            } catch (error) {
                console.log(error)
            }
            try {
                const singleEatUpdate = await eatModel.updateOne(
                    {slug: req.params.slug},
                    {
                        placeName: placeName,
                        slug: slug,
                        address: placeNameAndAddressArray[1],
                        coordinates:req.body.coordinates,
                        mrt: req.body.mrt,
                        ratings: Number(req.body.ratings),
                        price: Number(req.body.price),
                        category: req.body.tags,
                        comments: req.body.comments,
                        image: imageURL
                    }
                )
            } catch (err) {
                console.log(err)
                res.statusCode = 500
                res.redirect('/eats/'+req.params.slug)
                return  `single data update error`
            }
        }else {  // if no change in imageurl
            try {
                const singleEatUpdate = await eatModel.updateOne(
                    {slug: req.params.slug},
                    {
                        placeName: placeName,
                        slug: slug,
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
        }

        res.redirect('/eats')
    },

    delete: async (req,res) => {

        try {
            const singleEatDelete = await eatModel.deleteOne({slug: req.params.slug})
            const singleImageDelete = await cloudinary.uploader.destroy(req.params.slug, function(error,result) {
                console.log(result, error) });
        } catch (err) {
            console.log(err)
            res.statusCode = 500
            res.redirect('/eats/'+req.params.slug)
            return  `single data delete error`
        }
        res.redirect('/eats')
    },

    showRandom: async(req,res) => {
        let eats = []
        try {
            //random 4 options
            eats = await eatModel.aggregate([{$sample:{size:4}}])
        } catch (err) {
            console.log(err)
            res.statusCode = 500
            return  `data aggregation error`
        }
        console.log(eats)
        res.render(
            'eats/showRandom',
            {eats:eats}
        )
    }
}

function processPlaceNameAndAddress(req) {
    console.log(req.body)
    let placeNameAndAddress = req.body.placeNameAndAddress
    let index = placeNameAndAddress.indexOf(',')
    let placeNameAndAddressArray = [placeNameAndAddress.substring(0,index),placeNameAndAddress.substring(index+1)] 
    return placeNameAndAddressArray
}