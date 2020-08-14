const multer = require('multer')
const {v4} = require('uuid')
const express = require('express')
const router  = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'public/uploads/')
    },
    filename:(req, file, cb) => {
        const fileType = file.originalname.split('.')
        cb(null, `${v4()}.${fileType[fileType.length-1]}`)
    }
})

const upload = multer({storage: storage})
router.post('/saveImage', upload.single('files'), (req, res) => {
    res.json(req['file']['destination'] + req['file']['filename'] )
})
module.exports = router