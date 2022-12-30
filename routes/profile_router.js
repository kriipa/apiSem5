const express = require('express')
const uploadImage = require('../middleware/upload')

const router = express.Router()

router.route('/')
    .get()
    .post(uploadImage.single('profile'),
    (req,res,next) => {
        // create profile
        console.log(req.file)
        console.log(req.body)
    })
    .delete()

router.route('/:profile_id')
    .get()
    .put()
    .delete()

module.exports = router