const Joi = require('joi')
const validationData = require('./validation')
const createSchemaValidation = require('./schema')

const validate = (type) => {
    let schema = {
        name: Joi.string().max(255),
        parentId: Joi.number().integer().allow(null)
    }
    const validationObj = createSchemaValidation(schema, type)
    return validationData(validationObj)
}

module.exports = validate;