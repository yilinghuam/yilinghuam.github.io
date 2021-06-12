require('dotenv').config()

const _ = require('lodash')
const mapAccessToken = `${process.env.MAPBOX_TOKEN}`

const {eatModel} = require('../models/eats')
const {mrtModel} = require('../models/mrt')
const {formDataModel} = require('../models/formdata')

module.exports = {
    index: (req,res) => {
        res.render(
            'dashboard/index')
        },

    show: async(req,res) => {
        let query = req.params.cat
        console.log(query)

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
        console.log(data)
        res.render('dashboard/show', {data:data, query:query})
    },

    delete: async(req,res) => {
        
    }

    
    
}