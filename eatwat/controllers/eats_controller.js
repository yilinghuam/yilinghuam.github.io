require('dotenv').config()

const mapAccessToken = `${process.env.MAPBOX_TOKEN}`
const eatServices = require ('../services/eats_services')
const formServices = require('../services/form_services')
const cloudinaryServices = require('../services/cloudinary_services')
const mrtServices = require('../services/mrt_services')

module.exports = {
    index: async(req,res) => {
        let mrtStations =[]
        let formData ={}

        mrtStations = await mrtServices.getmrt(res)
        formData = await formServices.getForm(res)
        const eats =  await eatServices.findAll(req,res)
        
        //  if no data, redirect to add data
        if(eats.length === 0) {
            res.redirect('/eats/new')
            return
        }
        
        res.render('eats/index', {eats: eats,formData:formData, mrtStations:mrtStations})
    },

    newEat: async (req,res) => {
        let mrtStations =[]
        let formData = {}

        mrtStations = await mrtServices.getmrt(res)
        formData = await formServices.getForm(res)

        res.render('eats/new', 
            {mrtStations : mrtStations,
            formData: formData,
            mapAccessToken: mapAccessToken})
    },

    create: async(req,res) => {
        // check form not empty
        if (!req.body.mrt || !req.body.placeNameAndAddress || !req.body.category|| !req.body.price || !req.body.ratings) {
            res.redirect('/eats/new')
            return
        }

        let imageURL = ''

        // only upload if there is image file uploaded
        if(req.file !== undefined) {
            const result = await cloudinaryServices.uploadImage(req,res)
            imageURL = result.url
        }
        
        const singleEatCreate = await eatServices.create(req,res,imageURL)
        
        res.redirect('/eats')
    },

    show: async(req,res) => {
        let formData = {}
        formData = await formServices.getForm(res)
        const singleEat = await eatServices.findOne(req,res)
                    
        //  if eat is not found
        if (!singleEat) {
            res.redirect('/eats')
            return
        }           

        res.render('eats/show',
            {
            mapAccessToken: mapAccessToken,
            singleEat: singleEat,
            formData:formData
        })
    },

    edit: async(req,res) => {
        let mrtStations =[]
        let formData = {}

        mrtStations = await mrtServices.getmrt(res)
        formData = await formServices.getForm(res)
        const singleEat = await eatServices.findOne(req,res)
        
        if (!singleEat) {
            res.redirect('/eats')
            return
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
        // check form not empty
        if (!req.body.mrt || !req.body.placeNameAndAddress || !req.body.category || !req.body.price || !req.body.ratings) {
            res.redirect('/eats/'+req.params.slug)
            return
        }
        // if there is change in image
        if(req.file !== undefined) {
            const result = await cloudinaryServices.uploadImage(req,res)
            const imageURL = result.url
            const singleEatUpdate = await eatServices.updateWithImage(req,res,imageURL)
        }else {  // if no change in imageurl
            const singleEatUpdate = await eatServices.updateWithoutImage(req,res)
        }

        res.redirect('/eats')
    },

    delete: async (req,res) => {

        const singleEatDelete = await eatServices.deleteOne(req,res)
        const singleImageDelete = await cloudinaryServices.deleteImage(req,res)
        res.redirect('/eats')
    },

    showRandom: async(req,res) => {
        let formData ={}
        let eats = []

        formData = await formServices.getForm(res)
        eats = await eatServices.getRandom(req,res)
        // if no data then add new
        if (eats.length === 0) {
            res.redirect('/eats/new')
        }

        res.render(
            'eats/showRandom',
            {eats:eats,
            formData:formData
            }
        )
    },

    filter: async(req,res) => {
        let mrtStations =[]
        let formData = {}
        

        mrtStations = await mrtServices.getmrt(res)
        formData = await formServices.getForm(res)
        const eats =  await eatServices.filter(req,res)


        res.render('eats/filter', 
            {mrtStations : mrtStations,
            formData: formData,
            eats:eats})
    }
}
