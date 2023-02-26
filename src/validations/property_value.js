const Joi = require('joi')
const validationData = require('./validation')
const createSchemaValidation = require('./schema')

const validate = (type) => {
    let schema = {
        categoryId: Joi.number().integer(),
        propertyId: Joi.number().integer()
    }
    const validationObj = createSchemaValidation(schema, type)
    return validationData(validationObj)
}

module.exports = validate;