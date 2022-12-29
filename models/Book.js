const mongoose = require('mongoose')
const Catergory = require('./Category')

const reviewsSchema = mongoose.Schema({
    body: {
        type : String,
        required : true
    },
    date: {
        type : String,
        default : Date.now
    },
    reviewer: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
})

const bookSchema =  mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    reviews: [reviewsSchema],
    category : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Category'
    }
}, { timestamps : true })

module.exports = mongoose.model('Book', bookSchema)
