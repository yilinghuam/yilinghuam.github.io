
const {eatModel} = require('../models/eats')

module.exports = {
    index: async(req,res) => {
        let eats =[]

        try {
            eats = await eatModel.find()
        } catch (err) {
            res.statusCode(500)
            return 'server error'
        }
        console.log(eats)
        res.render('index', {eats: eats})
    }
}