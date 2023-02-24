const Joi = require('joi')
const validationData = require('./validation')
const createSchemaValidation = require('./schema')

const validate = (type) => {
    let schema = {
        productId: Joi.number().integer(),
        status: Joi.number().integer().valid(0, 1)
    }
    const validationObj = createSchemaValidation(schema, type)
    return validationData(validationObj)
}

module.exports = validate;