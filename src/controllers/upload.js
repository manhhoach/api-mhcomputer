const { responseSuccess } = require('../utils/response')
const CONSTANT_MESSAGES = require('../utils/constants/messages');
const tryCatch = require('../utils/tryCatch');
const AppError = require('../utils/AppError');
const { getFileName } = require('./../utils/getFileName')
const cloudinary = require('./../config/cloudinary')

const streamifier = require('streamifier');

module.exports.uploadSingle = tryCatch(async (req, res, next) => {
    let img_stream = cloudinary.v2.uploader.upload_stream({
        folder: 'computer',
        public_id: `${Date.now()}-${getFileName(req.file.originalname)}`
    }, function(error, result){
        if(error) {
           return next(new AppError(400, error))
        }
        return res.status(200).json(responseSuccess(result.url))
    })
    streamifier.createReadStream(req.file.buffer).pipe(img_stream)
 
})

module.exports.uploadArray = tryCatch(async (req, res, next) => {
    if (req.files.length > 0) {
        console.log(req.files);
        let urls = req.files.map(ele => {
            return ele.path
        })
        return res.status(200).json(responseSuccess(urls))
    }
    next(new AppError(400, CONSTANT_MESSAGES.FILE_UPLOAD_FAILED))
})


