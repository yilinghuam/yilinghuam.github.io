const {formDataModel} = require('../models/formdata')

module.exports = {
    getForm: async(res) => {
        try {
            formData = await formDataModel.findOne()
            return formData
        } catch (err) {
            res.statusCode = 500
            return `form error`
        }
    },
    getFormByQuery: async(res,query) => {
        try {
            let data = await formDataModel.findOne()
            data = data[query]
            return data
        } catch (err) {
            console.log(err)
            res.statusCode = 500
            return `data retrieval error`
        }
    },
    updateFormByItem: async(req,res, query, item, newkey) => {
        try {
            let originalFormData = await formDataModel.findOne()
            let targettedFormData = originalFormData[query]
            targettedFormData[newkey] = req.body.keyValue;
            delete targettedFormData[item];
            const replacedFormData = await formDataModel.findOneAndUpdate({slug:'formData'},originalFormData)
            return replacedFormData
        } catch (err) {
            console.log(err)
            res.statusCode = 500
            return `formData replacement error`
        }
    },
    createForm : async (req,res,query) => {
        const newkey = req.body.key;
        try {
            let newFormData = await formDataModel.findOne()
            let targettedFormData = newFormData[query]
            targettedFormData[newkey] = req.body.keyValue;
            const replacedFormData = await formDataModel.findOneAndUpdate({slug:'formData'},newFormData)
            return replacedFormData
        } catch (err) {
            console.log(err)
            res.statusCode = 500
            return `formData replacement error`
        }            
    },
    deleteFormByItem: async(res,query,item) => {
        try {
            let originalFormData = await formDataModel.findOne()
            let targettedFormData = originalFormData[query]
            delete targettedFormData[item];
            const replacedFormData = await formDataModel.findOneAndUpdate({slug:'formData'},originalFormData)
            return replacedFormData
        } catch (err) {
            console.log(err)
            res.statusCode = 500
            return `formData replacement error`
        }
    }
}