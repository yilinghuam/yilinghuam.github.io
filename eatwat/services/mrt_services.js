const {mrtModel} = require('../models/mrt')

module.exports = {
    getmrt: async() => {
        try {
            mrtStations = await mrtModel.find()
            return mrtStations
        } catch (err) {
            res.statusCode = 500
            return `mrt server error`
        }
    }
}