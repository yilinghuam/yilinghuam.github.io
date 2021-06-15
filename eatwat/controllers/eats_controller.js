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
const eatServices = require ('../services/eats_services')
const formServices = require('../services/form_services')
const cloudinaryServices = require('../services/cloudinary_services')
const mrtServices = require('../services/mrt_services')

module.exports = {
    index: async(req,res) => {
        let formData ={}

        const eats =  await eatServices.findAll(req,res)
        formData = await formServices.getForm()
        
        res.render('eats/index', {eats: eats,formData:formData})
    },

    newEat: async (req,res) => {
        let mrtStations =[]
        let formData = {}

        mrtStations = await mrtServices.getmrt()
        formData = await formServices.getForm()

        res.render('eats/new', 
            {mrtStations : mrtStations,
            formData: formData,
            mapAccessToken: mapAccessToken})
    },

    create: async(req,res) => {
        // check form not empty
        if (!req.body.mrt || !req.body.placeNameAndAddress || !req.body.category || !req.body.price || !req.body.ratings) {
            res.redirect('/eats/new')
            return
        }

        let imageURL = ''

        // only upload if there is image file uploaded
        if(req.file !== undefined) {
            result = await cloudinaryServices.uploadImage(req,res)
            imageURL = result.url
        }
        
        const singleEatCreate = await eatServices.create(req,res,imageURL)
        
        res.redirect('/eats')
    },

    show: async(req,res) => {
        let formData = {}
        
        const singleEat = await eatServices.findOne(req,res)
        formData = await formServices.getForm()

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

        mrtStations = await mrtServices.getmrt()
        formData = await formServices.getForm()
        singleEat = await eatServices.findOne(req,res)
    

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
                        image: imageURL,
                        user: req.session.user.user
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
                        user: req.session.user.user
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
        let formData ={}

        try {
            //random 4 options
            eats = await eatModel.aggregate([{$match:{user:req.session.user.user}},{$sample:{size:4}}])
            formData = await formDataModel.findOne()

        } catch (err) {
            console.log(err)
            res.statusCode = 500
            return  `data aggregation error`
        }
        console.log(eats)
        res.render(
            'eats/showRandom',
            {eats:eats,
            formData:formData
            }
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