// const express = require('express')
// const User = require('../models/User')
// const router = express.Router()
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// // const {hash} = require('bcrypt')

// router.post('/register', (req, res, next) => {
//     User.findOne({username: req.body.username})
//         .then(user => {
//             if(user != null){
//                 let err = new Error(`Username ${req.body.username} already registered.`)
//                 res.status(400)
//                 return next(err)
//             }
//             bcrypt.hash(req.body.password, 10, (err, hash) => {
//                 if(err) return next(err)
//                 user = new User()
//                 user.username = req.body.username
//                 user.password = hash
//                 if(req.body.role) user.role = req.body.role
//                 user.save().then(user => {
//                     res.status(201).json({
//                         status : 'User registration successful',
//                         userId : user._id,
//                         username: user.username,
//                         role:user.role
//                     })
//                 }).catch(next)
//             })
//         }).catch(next)
// })

// router.post('/login', (req, res, next) => {
//     User.findOne({username : req.body.username})
//     .then(user => {
//         if(user == null) {
//             let err = new Error('User is not registered.')
//             return next(err)
//         }
//         bcrypt.compare(req.body.password, user.password,
//             (err, success) => {
//                 if(err) return next(err)
//                 if(!success) {
//                     let err = new Error('Password does not match.')
//                     return next(err)
//                 }
//                 let data = {
//                     userId : user._id,
//                     username : user.username,
//                     role : user.role
//                 }
//                 jwt.sign(data, process.env.SECRET, {expiresIn : '1d'},
//                 (err, token) => {
//                     if(err) return next(err)
                    
//                     res.json({
//                         status: 'Login Successful',
//                         token: token
//                     })
//                 })
//             })
//     }).catch(next)
// })


// module.exports = router

const express = require('express')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const User = require('../models/User')

const router = express.Router()

router.post('/register', (req, res, next) => {

    User.findOne({ username: req.body.username })
        .then(user => {
            if (user != null) {
                res.status(400)
                return next(new Error(`Username ${req.body.username} already exists`))
            }

            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) next(err)
                let user = new User()
                user.username = req.body.username
                if (req.body.role) user.role = req.body.role
                user.password = hash
                user.save().then(user => {
                    data = {
                        id: user._id,
                        username: user.username,
                        role: user.role
                    }
                    res.status(201).json({ status: 'User registration success.', data })
                }).catch((err) => { res.status(400); next(err) })
            })
        }).catch(next)

})



router.post('/login', (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then(user => {
            if (user == null) {
                res.status(401)
                return next(new Error(`User ${req.body.username} has not registered.`))
            }
            bcrypt.compare(req.body.password, user.password, (err, status) => {
                if (err) return next(err)
                if (!status) {
                    res.status(401)
                    return next(new Error('Password does not match!'))
                }
                data = {
                    id: user._id,
                    username: user.username,
                    role: user.role
                }

                const token = jwt.sign(data,
                    process.env.SECRET, { expiresIn: '1h' })
                res.json({ status: 'Login Success', token: token })
            })
        }).catch(next)

})




module.exports = router