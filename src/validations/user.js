const Joi = require('joi')
const validationData = require('./validation')
const createSchemaValidation = require('./schema')
const { TYPE_VALIDATE } = require('./../utils/constants/typeValidate')

// joi.max: <= , joi.length: =
const validate = (type) => {
    let schema = {};
    if (type === TYPE_VALIDATE.CREATE) {
        schema = {
            email: Joi.string().email().max(255).required(),
            password: Joi.string().max(255).required(),
            phone: Joi.string().pattern(/((84|0)[3|5|7|8|9])+([0-9]{8})\b/).messages({
                'string.pattern.base': '{{#label}} with value {:[.]} fails to match the required pattern'
            }).required(),
            fullName: Joi.string().max(255).required(),
            gender: Joi.number().integer().valid(0, 1).required()

        }
    }
    else if (type === TYPE_VALIDATE.UPDATE) {
        schema = {
            phone: Joi.string().pattern(/((84|0)[3|5|7|8|9])+([0-9]{8})\b/).messages({
                'string.pattern.base': '{{#label}} with value {:[.]} fails to match the optional pattern'
            }).optional(),
            fullName: Joi.string().max(255).optional(),
            gender: Joi.number().integer().valid(0, 1).optional()
        }
    }
    else if (type === TYPE_VALIDATE.LOGIN) {
        schema = {
            email: Joi.string().email().max(255).required(),
            password: Joi.string().max(255).required(),
        }
    }
    const validationObj = Joi.object(schema)
    return validationData(validationObj)
}

module.exports = validate;