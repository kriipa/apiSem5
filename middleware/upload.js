const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination : (req, file, cb) => {          // cb = call back
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname)
        cb(null, `profile-${Date.now()}${ext}`)
    }
})

const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('File Format not spported.'), false)
    }
    cb(null, true)
}

const uploadImage = multer({
    storage: storage,
    fileFilter : imageFileFilter,
    limits: 2* 1024 * 1024
})

module.exports = uploadImage