const Joi = require('joi')
const validationData = require('./validation')
const {TYPE_VALIDATE} = require('./../utils/constants/typeValidate')


const validate = (type) => {
    let schema = {
        productId: Joi.number().integer(),
        content: Joi.string().max(1024),
        rate: Joi.number().integer().max(5).min(1),
    }
    if (type === TYPE_VALIDATE.UPDATE) {
        schema = { response: Joi.string().max(1024).required() }
    }
    else if (type === TYPE_VALIDATE.CREATE){
        for (let field in schema) {
            schema[field] = schema[field].required()
        }
    }
    const validationObj = Joi.object(schema)
    return validationData(validationObj)
}

module.exports = validate;