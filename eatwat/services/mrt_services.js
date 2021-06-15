const {mrtModel} = require('../models/mrt')
const _ = require('lodash')


module.exports = {
    getmrt: async(res) => {
        try {
            mrtStations = await mrtModel.find()
            return mrtStations
        } catch (err) {
            res.statusCode = 500
            return `mrt server error`
        }
    },
    findOneItem : async(req,res,item) => {
        try {
            const mrtStations = await mrtModel.findOne({slug:item}) 
            return mrtStations
        } catch (err) {
            res.statusCode = 500
            return `query server error`
        }
    },
    getMRTByAlpha: async(res) => {
        try {
            let data = await mrtModel.find()
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
            return data
        } catch (err) {
            console.log(err)
            res.statusCode = 500
            return `data retrieval error`
        }
    },
    updateMRT: async(req,res,item,station) => {
            try {
                const originalFormData = await mrtModel.findOneAndReplace(
                    {slug:item},
                    {station: station,
                    slug: _.kebabCase(station),
                    coordinates: req.body.mrtcoordinates},
                    {new:false})
                return originalFormData
            } catch (err) {
                console.log(err)
                res.statusCode = 500
                return `mrt replacement error`
            }
    },
    deleteMRT: async(res,item) =>{
        try {
            const originalFormData = await mrtModel.deleteOne({slug:item})
            return originalFormData
        } catch (err) {
            console.log(err)
            res.statusCode = 500
            return `mrt delete error`
        }
    },
    createMRT: async(req,res) => {
        let station = req.body.mrt
        try {
            const newFormData = await mrtModel.create(
                {station: station,
                slug: _.kebabCase(station),
                coordinates: req.body.mrtcoordinates})
            return newFormData
        } catch (err) {
            console.log(err)
            res.statusCode = 500
            return `mrt replacement error`
        }            
    }
}