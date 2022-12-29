const books = require('../data/books')
const Book = require('../models/Book')

const getAllBooks = (req, res, next) => {
    Book.find()     // find all *
        .then(books => { res.json(books)})
        .catch(next)
}

const createABook = (req, res, next) => {
    Book.create(req.body)
        .then(book => res.status(201).json(book))
        .catch(err => next(err))
}

const deleteAllBooks = (req, res, next) => {
    Book.deleteMany()
        .then(reply => res.json(reply))
        .catch(next)
}

const getBookById = (req, res, next) => {
    Book.findById(req.params.id)
    .populate('category')
    .then(book => res.json(book))
    .catch(next)
}

const updateBookById = (req, res, next) => {
    Book.findByIdAndUpdate(req.params.id,{ $set: req.body}, {new : true})
    .then(book => res.json(book))
    .catch(next)
}

const deleteBookById = (req, res, next) => {
    Book.findByIdAndDelete(req.params.id)
        .then(book => res.json(book))
        .catch(next)
}

module.exports = {
    getAllBooks,
    createABook,
    deleteAllBooks,
    getBookById,
    updateBookById,
    deleteBookById
}