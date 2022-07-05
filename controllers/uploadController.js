const { responseSuccess, responseWithError } = require('./../utils/response')
const fs = require('fs')
const cloudinary = require('cloudinary')
const dotenv= require('dotenv').config();
//const config = require('./../keys/cloudinary')
const config ={
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET, 
}


cloudinary.config(config)

const getFileName = (filename) => {
    let i = filename.lastIndexOf('.');
    return filename.slice(0, i);
}

module.exports.uploadSingle = async (req, res, next) => {
    try {
        if (req.file) {
            let data = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'computer',
                use_filename: true
            })
            fs.unlinkSync(req.file.path);
            res.json(responseSuccess(data.url))
        }
        else {
            res.json(responseWithError('FILE UPLOAD FAILED'))
        }
    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.uploadArray = async (req, res, next) => {
    try {
        if (req.files.length > 0) {
            let data = await Promise.all(req.files.map(async (file) => {
                let result = await cloudinary.v2.uploader.upload(file.path, {
                    folder: 'computer',
                    use_filename: true
                })
                fs.unlinkSync(file.path);
                return result.url;
            }))
            res.json(responseSuccess(data))
        }
        else {
            res.json(responseWithError('FILE UPLOAD FAILED'))
        }
    }
    catch (err) {
        res.json(responseWithError(err))
    }
}