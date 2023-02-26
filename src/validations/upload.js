const Joi = require('joi')
const AppError = require('../utils/AppError');

let fileSchema = Joi.object({
    fieldname: Joi.string().optional(),
    encoding: Joi.string().optional(),
    originalname: Joi.string().required(),
    buffer: Joi.binary().required(),
    mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
    size: Joi.number().integer().optional(),
})


const validateUploadSingle = (req, res, next) => {
    const uploadSchema = Joi.object({
        file: fileSchema.required()
    })
    const { error } = uploadSchema.validate({ file: req.file });
    if (error) {
        return next(new AppError(400, error.details[0].message))
    }
    next();
}

const validateUploadArray = (req, file, cb) => {
    const uploadSchema = Joi.object({
        files: Joi.array().items(fileSchema).required()
    })
    console.log(req.files);
    const { error } = uploadSchema.validate({ files: req.files });
    if (error) {
        return cb(new AppError(400, error.details[0].message))
    }
    cb(null, true)
}

module.exports = { validateUploadSingle, validateUploadArray }