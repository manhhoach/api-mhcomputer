const { responseSuccess } = require('../utils/response')
const tryCatch = require('../utils/tryCatch');
const AppError = require('../utils/AppError');
const { getFileName } = require('./../utils/getFileName')
const cloudinary = require('cloudinary')
const { CLOUDINARY_CONFIG } = require('./../config/cloudinary')
cloudinary.config(CLOUDINARY_CONFIG)
const streamifier = require('streamifier');

const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
        const img_stream = cloudinary.v2.uploader.upload_stream({
            folder: 'computer',
            public_id: `${Date.now()}-${getFileName(file.originalname)}`
        }, function (error, result) {
            if (error) {
                reject(new AppError(400, error))
            }
            else {
                resolve(result.url)
            }
        })
        streamifier.createReadStream(file.buffer).pipe(img_stream)
    })

}

module.exports.uploadSingle = tryCatch(async (req, res, next) => {
    let url = await uploadImage(req.file);
    return res.status(200).json(responseSuccess(url))

})

module.exports.uploadArray = tryCatch(async (req, res, next) => {

    const uploadPromises = req.files.map(uploadImage)
    const urls = await Promise.all(uploadPromises)
    res.status(200).json(responseSuccess(urls))

})



