const Joi = require('joi')
const AppError = require('./../utils/AppError')

let unit = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().required()
})

let detailAddress = Joi.object({
    city: unit,
    district: unit,
    ward: unit
})

const addressSchema = Joi.object({
    userId: Joi.number().integer().optional(),
    name: Joi.string().max(255).optional(),
    phone: Joi.string().max(20).optional(),
    typeAddress: Joi.number().valid(0, 1).optional(),
    detailAddress: detailAddress.optional(),
    street: Joi.string().max(512).optional(),
    createdDate: Joi.date().optional(),
});


const validateAddress = (req, res, next) => {
    const { error } = addressSchema.validate(req.body);
    if (error) {
        console.log(error);
        return next(new AppError(400, error.details[0].message))
    }
    next();
}

module.exports = validateAddress;