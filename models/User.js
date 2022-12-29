const { tr } = require('date-fns/locale')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique :[true, 'This is already registred'],
        minLength : [5, 'Usernames should be longer than 5 characters.']
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type: String,
        enum : ['User', 'Admin'],
        default : 'User'
    }
}, {timestamps : true})

module.exports = mongoose.model('User', userSchema)