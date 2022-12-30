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