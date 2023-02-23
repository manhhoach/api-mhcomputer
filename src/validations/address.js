const Joi = require('joi')
const AppError = require('./../utils/AppError')

//abortEarly: false: validate all fields

const createAddressSchema = (type = 'CREATE') => {
    let unit = Joi.object({
        id: Joi.number().integer().required(),
        name: Joi.string().required()
    })

    let detailAddress = Joi.object({
        city: unit,
        district: unit,
        ward: unit
    })
    let addressValidation = {
        name: Joi.string().max(255),
        phone: Joi.string().pattern(/((84|0)[3|5|7|8|9])+([0-9]{8})\b/).messages({
            'string.pattern.base': '{{#label}} with value {:[.]} fails to match the required pattern'
        }),
        typeAddress: Joi.number().valid(0, 1),
        detailAddress: detailAddress,
        street: Joi.string().max(512)
    }
    if (type === 'UPDATE') {
        for (let field in addressValidation) {
            addressValidation[field] = addressValidation[field].optional()
        }
    }
    else {
        for (let field in addressValidation) {
            addressValidation[field] = addressValidation[field].required()
        }
    }
    addressValidation = Joi.object(addressValidation)
    return addressValidation
}



const validateAddress = (type) => {
    const addressValidation = createAddressSchema(type)
    return (req, res, next) => {   
        const { error } = addressValidation.validate(req.body);
        console.log(error);
        if (error) {
            return next(new AppError(400, error.details[0].message))
        }
        next();
    }
}



module.exports = validateAddress;