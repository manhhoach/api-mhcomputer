const Joi = require('joi')
const validationData = require('./validation')
const { createPropertySchema } = require('./product_detail')
const createSchemaValidation = require('./schema')

const validate = (type) => {
    let schema = {
        categoryId: Joi.number().integer(),
        brandId: Joi.number().integer(),
        name: Joi.string().max(1024),
        price: Joi.number().integer().positive(),
        description: Joi.string().max(1024),
        imageUrl: Joi.array().items(Joi.string()),
        imageCover: Joi.string().max(255),
        accessories: Joi.string().max(255),
        offer: Joi.string().max(255),
        property: Joi.array().items(createPropertySchema(type))
    }
    const validationObj = createSchemaValidation(schema, type)
    return validationData(validationObj)
}

module.exports = validate;