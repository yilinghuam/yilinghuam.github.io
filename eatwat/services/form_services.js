const {formDataModel} = require('../models/formdata')

module.exports = {
    getForm: async() => {
        try {
            formData = await formDataModel.findOne()
            return formData
        } catch (err) {
            res.statusCode = 500
            return `form error`
        }
    }
}