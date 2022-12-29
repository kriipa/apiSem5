const Category = require('../models/Category')

const getCategory = (req, res, next) => {
    Category.find()
        .then(categories => {res.json(categories)})
        .catch(next)
}

const createCategory = (req, res, next) => {
    Category.create(req.body)
        .then(categories => res.status(201).json(categories))
        .catch(err => next(err))
}

const deleteCategory = (req, res, next) => {
    Category.deleteMany()
        .then(reply => res.json(reply))
        .catch(next)
}

const getCategoryByID = (req, res, next) => {
    Category.findById(req.params.category_id)
    .populate('books')
    .then(categories => res.json(categories))
    .catch(next)
}

const updateCategoryById = (req, res, next) => {
    Category.findByIdAndUpdate(req.params.category_id,
        {$set: req.body}, {new: true})
        .then(categories => res.json(categories))
        .catch(next)
    
}

const deleteCategoryByIDd = (req, res, next) => {
    Category.findByIdAndDelete(req.params.category_id)
    .then(reply => res.json(reply))
    .catch(next)
}

module.exports = {
    getCategory,
    createCategory,
    deleteCategory,
    getCategoryByID,
    updateCategoryById,
    deleteCategoryByIDd
}