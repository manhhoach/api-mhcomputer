const Joi = require('joi')
const validationData = require('./validation')
const createSchemaValidation = require('./schema')
const { TYPE_VALIDATE } = require('./../utils/constants/typeValidate')

const validate = (type) => {
    let schema = {
        productId: Joi.number().integer(),
        showRoomId: Joi.number().integer(),
        quantity: Joi.number().integer().positive(),
    }
    let validationObj;
    if (type === TYPE_VALIDATE.CREATE)
        validationObj = createSchemaValidation(schema, type)
    else
        validationObj = Joi.object({ quantity: Joi.number().integer().positive().required() })
    return validationData(validationObj)

}

module.exports = validate;