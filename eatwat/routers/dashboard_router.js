const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/dashboard_controller')
const {adminOnly} = require('../middlewares/auth-middleware')

router.get('/', adminOnly, dashboardController.index)
router.get('/:cat', adminOnly, dashboardController.show)
router.post('/:cat', adminOnly, dashboardController.create)
router.get('/:cat/new', adminOnly, dashboardController.newItem)
router.get('/:cat/:item/edit', adminOnly, dashboardController.edit)
router.patch('/:cat/:item', adminOnly, dashboardController.update)
router.delete('/:cat/:item', adminOnly, dashboardController.delete)

module.exports = router