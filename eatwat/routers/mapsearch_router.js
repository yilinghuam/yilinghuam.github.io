const express = require('express')
const router = express.Router()
const mapsearchController = require('../controllers/mapsearch_controller')
const {authenticatedOnly} = require('../middlewares/auth-middleware')

router.get('/', authenticatedOnly, mapsearchController.index)
router.post('/', authenticatedOnly, mapsearchController.create)
router.get('/:mrt', authenticatedOnly, mapsearchController.show)

module.exports = router