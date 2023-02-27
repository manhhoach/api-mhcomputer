const Joi = require('joi')
const AppError = require('../utils/AppError');
const {TYPE_VALIDATE} = require('./../utils/constants/typeValidate')

let fileSchema = Joi.object({
    fieldname: Joi.string().optional(),
    encoding: Joi.string().optional(),
    originalname: Joi.string().required(),
    buffer: Joi.binary().required(),
    mimetype: Joi.string().pattern(/^(image\/)(jpeg|png|jpg)$/).messages({
        'string.pattern.base': 'Image type must be one of jpeg, png, jpg'
    }).required(),
    size: Joi.number().integer().optional(),
})

const validateUpload = (type) => {
    return (req, res, next) => {
        let [uploadSchema, body] = type === TYPE_VALIDATE.SINGLE ? [Joi.object({ file: fileSchema.required() }), { file: req.file }] :
            [Joi.object({ files: Joi.array().items(fileSchema).required() }), { files: req.files }]
        const { error } = uploadSchema.validate(body);
        if (error) {
            return next(new AppError(400, error.details[0].message))
        }
        next()
    }
}

module.exports = { validateUpload }

// const validateUploadSingle = (req, res, next) => {
//     const uploadSchema = Joi.object({
//         file: fileSchema.required()
//     })
//     const { error } = uploadSchema.validate({ file: req.file });
//     if (error) {
//         return next(new AppError(400, error.details[0].message))
//     }
//     next();
// }

// const validateUploadArray = (req, res, next) => {
//     const uploadSchema = Joi.object({
//         files: Joi.array().items(fileSchema).required()
//     })
//     const { error } = uploadSchema.validate({ files: req.files });
//     if (error) {
//         return next(new AppError(400, error.details[0].message))
//     }
//     next()
// }

