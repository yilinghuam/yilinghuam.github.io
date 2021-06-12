require('dotenv').config()

const _ = require('lodash')
const mapAccessToken = `${process.env.MAPBOX_TOKEN}`

const {eatModel} = require('../models/eats')
const {mrtModel} = require('../models/mrt')
const {formDataModel} = require('../models/formdata')
const { map } = require('lodash')

module.exports = {
    index: (req,res) => {
        res.render(
            'dashboard/index')
        },

    show: async(req,res) => {
        let query = req.params.cat

        let data = []

        if (query === 'mrt') {
            try {
                data = await mrtModel.find()
                data = data.sort(function(a,b){
                    var nameA = a.station.toUpperCase(); // ignore upper and lowercase
                    var nameB = b.station.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    // names must be equal
                    return 0;
                    })
            } catch (err) {
                console.log(err)
                res.statusCode = 500
                return `data retrieval error`
            }
        }else {
            try {
                data = await formDataModel.find()
                data = data[0][query]
            } catch (err) {
                console.log(err)
                res.statusCode = 500
                return `data retrieval error`
            }
        }
        res.render('dashboard/show', {data:data, query:query})
    },
    edit: async(req,res) => {
        let query = req.params.cat
        let item = req.params.item
        let data = {}

        if (query === 'mrt') {
            try {
                data = await mrtModel.findOne({slug:item})
            } catch (err) {
                console.log(err)
                res.statusCode = 500
                return `mrt retrieval error`
            }
        }else{
            try {
                data = await formDataModel.findOne()
                data = data[query]
            } catch (err) {
                console.log(err)
                res.statusCode = 500
                return `mrt retrieval error`
            }
        }
        console.log(item)
        console.log(data)
        res.render('dashboard/edit',{query:query,item:item,data:data,mapAccessToken:mapAccessToken})
    },

    update: async(req,res) => {
        let query = req.params.cat
        let item = req.params.item
        let originalFormData = {}
        let replacedFormData = {}
        let replacedEatsData = []
        console.log(req.body)

        if (query === 'mrt') {
            let station = req.body.mrt
            try {
                originalFormData = await mrtModel.findOneAndReplace(
                    {slug:item},
                    {station: station,
                    slug: _.kebabCase(station),
                    coordinates: req.body.mrtcoordinates},
                    {new:false})
            } catch (err) {
                console.log(err)
                res.statusCode = 500
                return `mrt replacement error`
            }
            try {
                replacedEatsData = await eatModel.updateMany({mrt:originalFormData.station},{mrt:station})
            } catch (err) {
                console.log(err)
                res.statusCode = 500
                return `eat replacement error`
            }
            res.redirect('/dashboard/'+query)
        }

        if (query !== 'mrt') {
            const newkey = req.body.key;
            try {
                originalFormData = await formDataModel.findOne()
                let targettedFormData = originalFormData[query]
                targettedFormData[newkey] = req.body.keyValue;
                delete targettedFormData[item];
                replacedFormData = await formDataModel.findOneAndUpdate({slug:'formData'},originalFormData)
            } catch (err) {
                console.log(err)
                res.statusCode = 500
                return `formData replacement error`
            }
            try {
                if (query === 'category') {
                    replacedEatsData = await eatModel.updateMany({category:item},{category:newkey})
                } else {
                    replacedEatsData = await eatModel.updateMany({[query]:Number(item)},{[query]:Number(newkey)})
                }
            } catch (err) {
                console.log(err)
                res.statusCode = 500
                return `eat replacement error`
            }
            res.redirect('/dashboard/'+query)
        }
    },

    newItem: async(req,res) =>{
        let query = req.params.cat
        res.render('dashboard/new',{query:query,mapAccessToken:mapAccessToken})
    },

    create: async(req,res) => {
        let query = req.params.cat
        let newFormData = {}
        let replacedFormData = {}
        let replacedEatsData = []
         console.log(req.body)

        if (query === 'mrt') {
            let station = req.body.mrt
            try {
                newFormData = await mrtModel.create(
                    {station: station,
                    slug: _.kebabCase(station),
                    coordinates: req.body.mrtcoordinates})
            } catch (err) {
                console.log(err)
                res.statusCode = 500
                return `mrt replacement error`
            }
            res.redirect('/dashboard/'+query)
        }
        if (query !== 'mrt') {
            const newkey = req.body.key;
            try {
                newFormData = await formDataModel.findOne()
                let targettedFormData = newFormData[query]
                targettedFormData[newkey] = req.body.keyValue;
                replacedFormData = await formDataModel.findOneAndUpdate({slug:'formData'},newFormData)
            } catch (err) {
                console.log(err)
                res.statusCode = 500
                return `formData replacement error`
            }
            
            res.redirect('/dashboard/'+query)
        }
    },

    delete: async(req,res) => {
        let query = req.params.cat
        let item = req.params.item
        let originalFormData = {}
        let replacedFormData = {}
        let eatsData = []

        if (query === 'mrt') {
            let station = req.body.mrt
            try {
                originalFormData = await mrtModel.findOne({slug:item})
            } catch (err) {
                console.log(err)
                res.statusCode = 500
                return `mrt find error`
            }
            try {
                eatsData = await eatModel.find({mrt:originalFormData.station})
                console.log(Object.keys(eatsData))
            } catch (err) {
                console.log(err)
                res.statusCode = 500
                return `eat replacement error`
            }
            if(Object.keys(eatsData).length === 0) {
                try {
                    originalFormData = await mrtModel.deleteOne({slug:item})
                } catch (err) {
                    console.log(err)
                    res.statusCode = 500
                    return `mrt delete error`
                }
            }// else show a message that says cannot delete when database is using item
            res.redirect('/dashboard/'+query)
        }

        if (query !== 'mrt') {
            const newkey = req.body.key;
            try {
                if (query === 'category') {
                    eatsData = await eatModel.find({category:item})
                } else {
                    eatsData = await eatModel.find({[query]:Number(item)})
                }
            } catch (err) {
                console.log(err)
                res.statusCode = 500
                return `eat find error`
            }
            if(eatsData.length === 0) {
                try {
                    originalFormData = await formDataModel.findOne()
                    let targettedFormData = originalFormData[query]
                    delete targettedFormData[item];
                    replacedFormData = await formDataModel.findOneAndUpdate({slug:'formData'},originalFormData)
                } catch (err) {
                    console.log(err)
                    res.statusCode = 500
                    return `formData replacement error`
                }
            }
            
            
            res.redirect('/dashboard/'+query)
        }
    }
 }