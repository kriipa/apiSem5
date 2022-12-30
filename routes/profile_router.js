const express = require('express')

const router = express.Router()

router.route('/')
    .get()
    .post((req,res,next) => {
        // create orofile
    })
    .delete()

router.route('/:profile_id')
    .get()
    .put()
    .delete()

module.exports = router