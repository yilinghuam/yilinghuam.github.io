require('dotenv').config()

const mapAccessToken = `${process.env.MAPBOX_TOKEN}`
const eatServices = require ('../services/eats_services')
const formServices = require('../services/form_services')
const mrtServices = require('../services/mrt_services')

module.exports = {
    index: (req,res) => {
        res.render(
            'dashboard/index')
        },

    show: async(req,res) => {
        let query = req.params.cat
        let data = []

        if (query === 'mrt') {
            data = await mrtServices.getMRTByAlpha(res)
        }else {
            data = await formServices.getFormByQuery(res,query)
        }

        res.render('dashboard/show', {data:data, query:query})
    },
    edit: async(req,res) => {
        let query = req.params.cat
        let item = req.params.item
        let data = {}

        if (query === 'mrt') {
            data = await mrtServices.findOneItem(req,res,item)
        }else{
            data = await formServices.getFormByQuery(res,query)
        }
        
        res.render('dashboard/edit',{query:query,item:item,data:data,mapAccessToken:mapAccessToken})
    },

    update: async(req,res) => {
        let query = req.params.cat
        let item = req.params.item
        let originalFormData = {}
        let replacedEatsData = []

        if (query === 'mrt') {
            const station = req.body.mrt
            originalFormData = await mrtServices.updateMRT(req,res,item,station)
            const originalStation = originalFormData.station
            replacedEatsData = await eatServices.updateByStation(req,res,station,originalStation)
            res.redirect('/dashboard/'+query)
        }

        if (query !== 'mrt') {
            const newkey = req.body.key;
            const replacedFormData = await formServices.updateFormByItem(req,res,query,item,newkey)
            if (query === 'category') {
                replacedEatsData = await eatServices.updateByCategory(res, item, newkey)
            } else {
                replacedEatsData = await eatServices.updateByRatingsPrice(res,item,newkey,query)
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

        if (query === 'mrt') {
            newFormData = await mrtServices.createMRT(req,res)
            res.redirect('/dashboard/'+query)
        }
        if (query !== 'mrt') {
            replacedFormData = await formServices.createForm(req,res,query)   
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
            originalFormData = await mrtServices.findOneItem(req,res,item)
            const station = originalFormData.station
            eatsData = await eatServices.findByMRTAdmin(res,station)
            
            if(Object.keys(eatsData).length === 0) {
                originalFormData = await mrtServices.deleteMRT(res,item)
            }// else show a message that says cannot delete when database is using item
            res.redirect('/dashboard/'+query)
        }

        if (query !== 'mrt') {
            const newkey = req.body.key;

            if (query === 'category') {
                eatsData = await eatServices.findByCategoryAdmin(res,item)
            } else {
                eatsData = await eatServices.findByRatingsPriceAdmin(res,query,item)
            }                

            if(eatsData.length === 0) {
                replacedFormData = await formServices.deleteFormByItem(res,query,item)
            }
            res.redirect('/dashboard/'+query)
        }
    }
 }