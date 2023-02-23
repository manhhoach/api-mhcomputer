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
    name: Joi.string().max(255).optional(),
    phone: Joi.string().pattern(/((84|0)[3|5|7|8|9])+([0-9]{8})\b/).optional().messages({
        'string.pattern.base': '{{#label}} with value {:[.]} fails to match the required pattern'
       // 'string.pattern.base': '{{#label}} with value {:[.]} fails to match the required pattern: {{#regex}}'
    }),
    typeAddress: Joi.number().valid(0, 1).optional(),
    detailAddress: detailAddress.optional(),
    street: Joi.string().max(512).optional(),
    createdDate: Joi.date().optional(),
});


const validateAddress = (req, res, next) => {
    const { error } = addressSchema.validate(req.body);
    if (error) {
        console.log(error.details);
        return next(new AppError(400, error.details[0].message))
    }
    next();
}

module.exports = validateAddress;