const Joi = require('joi')
const validationData = require('./validation')
const createSchemaValidation = require('./schema')



const validate = (type) => {
    let schema = {
        categoryId: Joi.number().integer(),
        imageUrl: Joi.string().max(1024)
    }
    const validationObj = createSchemaValidation(schema, type)
    return validationData(validationObj)
}

module.exports = validate;