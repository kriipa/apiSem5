const books = require('../data/books')
const Book = require('../models/Book')

const getAllReviews = (req, res, next) => {
    Book.findById(req.params.id)
    .then((book) => {
        res.json(book.reviews)
    }).catch(next)
}

const createReview = (req, res, next) => {
    // console.log(req,user)
    // console.log(req.body)
    req.body.reviewer = req.user.userId
    Book.findById(req.params.id)
    .then((book) => {
        book.reviews.push(req.body)
        book.save().then(b => res.json(b.reviews))
    }).catch(next)
}

const deleteAllReviews = (req, res, next) => {
    Book.findById(req.params.id)
    .then((book) => {
        book.reviews = []
        book.save().then(b => res.json(b.reviews))
    }).catch(next)
}

const getReviewsById = (req, res, next) => {
    Book.findById(req.params.id)
    .then(book =>{
        res.json(book.reviews.id(req.params.review_id))
    }).catch(next)
}

const updateReviewsById = (req, res, next) => {
    Book.findById(req.params.id)
    .then(book => {    
        let updated_reviews =  book.reviews.map((item) => {
            if(item.id == req.params.review_id){
                item.body = req.body.body
            }
            return item
        })
        book.reviews = updated_reviews
        book.save()
        .then(book => res.json(book.reviews))
    }).catch(next)
}

const deleteReviewsById = (req, res, next) => {
    Book.findById(req.params.id)
        .then (book => {
            let updated_reviews = book.reviews.filter((item) => {
                return item.id != req. params.review_id
            })
            book.reviews = updated_reviews
            book.save().then(book => res.json(book.reviews))
        }).catch(next)
}

module.exports = {
    getAllReviews,
    createReview,
    deleteAllReviews,
    getReviewsById,
    updateReviewsById,
    deleteReviewsById
}