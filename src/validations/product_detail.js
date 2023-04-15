const Joi = require('joi')
const { TYPE_VALIDATE } = require('./../utils/constants/typeValidate')


const createPropertySchema = (type) => {
    let propertySchema = type === TYPE_VALIDATE.CREATE ? {
        propertyId: Joi.number().integer().required(),
        propertyName: Joi.string().required(),
        value: Joi.string().max(1024).required()
    } : {
        productDetailId: Joi.number().integer().required(),
        value: Joi.string().max(1024).required()
    }
    return Joi.object(propertySchema)
}


module.exports = { createPropertySchema }