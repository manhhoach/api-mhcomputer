const { responseSuccess } = require('./../utils/response')
const CONSTANT_MESSAGES = require('./../utils/constants/messages');
const tryCatch = require('./../utils/tryCatch');
const AppError = require('./../utils/AppError');

module.exports.uploadSingle = tryCatch(async (req, res, next) => {
    if (req.file) {
        return res.status(200).json(responseSuccess(req.file.path))
    }
    next(new AppError(400, CONSTANT_MESSAGES.FILE_UPLOAD_FAILED))
})

module.exports.uploadArray = tryCatch(async (req, res, next) => {
    if (req.files.length > 0) {
        let urls = req.files.map(ele => {
            return ele.path
        })
        return res.status(200).json(responseSuccess(urls))
    }
    next(new AppError(400, CONSTANT_MESSAGES.FILE_UPLOAD_FAILED))
})


