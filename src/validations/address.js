const Joi = require('joi')
const validationData = require('./validation')
const createSchemaValidation = require('./schema')


const validate = (type) => {
    let unit = Joi.object({
        id: Joi.number().integer().required(),
        name: Joi.string().required()
    })
    let detailAddress = Joi.object({
        city: unit,
        district: unit,
        ward: unit
    })
    let schema = {
        name: Joi.string().max(255),
        phone: Joi.string().pattern(/((84|0)[3|5|7|8|9])+([0-9]{8})\b/).messages({
            'string.pattern.base': '{{#label}} with value {:[.]} fails to match the required pattern'
        }),
        typeAddress: Joi.number().valid(0, 1),
        detailAddress: detailAddress,
        street: Joi.string().max(512)
    }
    const validationObj = createSchemaValidation(schema, type)
    return validationData(validationObj)
}

module.exports = validate;