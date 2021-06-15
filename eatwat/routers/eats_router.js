const express = require('express')
const router = express.Router()
const eatController = require('../controllers/eats_controller')
const multer  = require('multer')
const fileUpload = multer()
const {authenticatedOnly} = require('../middlewares/auth-middleware')

// index
router.get('/', authenticatedOnly, eatController.index)

// new
router.get('/new', authenticatedOnly,eatController.newEat)

// create
router.post('/', authenticatedOnly, fileUpload.single('image'), eatController.create)

// show
router.get('/random', authenticatedOnly, eatController.showRandom) // random
router.get('/:slug', authenticatedOnly, eatController.show)

// edit
router.get('/:slug/edit', authenticatedOnly,eatController.edit)

// update
router.patch('/:slug', authenticatedOnly, fileUpload.single('image'),eatController.update)

// delete
router.delete('/:slug', authenticatedOnly, eatController.delete)

module.exports = router