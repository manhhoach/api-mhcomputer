const Joi = require('joi')
const validationData = require('./validation')
const createSchemaValidation = require('./schema')

const validate = (type) => {
    let schema = {
        name: Joi.string().max(255),
        email: Joi.string().email().max(64),
        phone: Joi.string().pattern(/((84|0)[3|5|7|8|9])+([0-9]{8})\b/).messages({
            'string.pattern.base': '{{#label}} with value {:[.]} fails to match the required pattern'
        }),
        address: Joi.string().max(512),
        urlMap: Joi.string(),
        imageUrl: Joi.string(),
        openTime: Joi.string().max(128)
    }
    const validationObj = createSchemaValidation(schema, type)
    return validationData(validationObj)
}

module.exports = validate;