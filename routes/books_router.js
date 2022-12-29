const { de, it } = require('date-fns/locale')
const express = require('express')
const { map, filter } = require('../data/books')
// const books = require('../data/books')

const booksController = require('../controllers/books_controller')
const reviewsController = require('../controllers/reviews_controller')
const books = require('../data/books')
const {verifyUser, verifyAdmin} = require('../middleware/auth')

const router = express.Router()

router.route('/')
    .get(booksController.getAllBooks) 
    .post(verifyUser,booksController.createABook)
    .put((req, res) =>{
        res.status(501).json({'msg': 'Not implemented'})
    })
    .delete(verifyUser, verifyAdmin, booksController.deleteAllBooks)

router.use(verifyUser)
    .route('/:id')
    .get(booksController.getBookById)
    .post((req, res) => {
        res.status(501).json({'msg' : 'Not implemented'})
    })
    .put(booksController.updateBookById) 
    .delete(booksController.deleteBookById)
    
router.route('/:id/reviews')
    .get(reviewsController.getAllReviews)
    .post(verifyUser, reviewsController.createReview)
    .put((req, res) => {
        res.status(501).json({'msg' : 'Not implemented'})
    })
    .delete(reviewsController.deleteAllReviews)

    router.route('/:id/reviews/:review_id')
    .get(reviewsController.getReviewsById)
    .post((req, res) => {
        res.status(501).json({'msg' : 'Not implemented'})
    })
    .put(reviewsController.updateReviewsById)
    .delete(reviewsController.deleteReviewsById)

module.exports = router

