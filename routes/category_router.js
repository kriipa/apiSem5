const express = require('express')

const categoryController = require('../controllers/category_controller')

const router = express.Router()

router.route('/')
    .get(categoryController.getCategory)
    .post(categoryController.createCategory)
    .put((req, res) => 
        res.status(501).json({'msg': 'Not implemented'}))
    .delete(categoryController.deleteCategory)

router.route('/:category_id')
    .get(categoryController.getCategoryByID)
    .post((req, res) => 
        res.status(501).json({'msg': 'Not implemented'}))
    .put(categoryController.updateCategoryById)
    .delete(categoryController.deleteCategory)

module.exports = router