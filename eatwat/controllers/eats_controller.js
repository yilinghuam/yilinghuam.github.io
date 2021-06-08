require('dotenv').config()

const _ = require('lodash')
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
var multer  = require('multer')
const fileUpload = multer()

const mapAccessToken = `${process.env.MAPBOX_TOKEN}`

const {eatModel} = require('../models/eats')
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
        let placeName = placeNameAndAddressArray[0]
        let slug = _.kebabCase(placeName)
        let imageURL = ''

        // for cases with image uploading
        // if (req.files !== null) {
        //     let image = req.files.image.tempFilePath

        //     try {
        //         const upload= await cloudinary.uploader.upload(image, 
        //             {public_id: slug, //set option parameter
        //             folder: 'eatwat'} ,	
        //             function(error, result) {
        //                 imageURL = result.url
        //             });
        //     } catch (error) {
        //         console.log(error)
        //         return `single upload error`
        //     }
        // }

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

        try {
            let result = await streamUpload(req);
        } catch (error) {
            console.log(error)
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
        let placeName = placeNameAndAddressArray[0]
        let slug = _.kebabCase(placeName)
        let imageURL = ''

        // if image is updated then new image file uploaded
        if (req.files !== null) {
            let image = req.files.image.tempFilePath

            try {
                const upload= await cloudinary.uploader.upload(image, 
                    {public_id: slug, //set option parameter
                    folder: 'eatwat',
                    overwrite: true} , // allow overwriting if image already exist	
                    function(error, result) {
                        imageURL = result.url
                    });
            } catch (error) {
                console.log(error)
                return `single upload error`
            }
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
    }
}

function processPlaceNameAndAddress(req) {
    let placeNameAndAddress = req.body.placeNameAndAddress
    let index = placeNameAndAddress.indexOf(',')
    let placeNameAndAddressArray = [placeNameAndAddress.substring(0,index),placeNameAndAddress.substring(index+1)] 
    return placeNameAndAddressArray
}