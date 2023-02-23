const Joi = require('joi')
const validationData = require('./validation')
const {TYPE_VALIDATE} = require('./../utils/constants/typeValidate')


const createSchema = (type) => {
    let validationObj = {
        productId: Joi.number().integer(),
        content: Joi.string().max(1024),
        rate: Joi.number().integer().max(5).min(1),
    }
    if (type === TYPE_VALIDATE.UPDATE) {
        validationObj = { response: Joi.string().max(1024).required() }
    }
    else if (type === TYPE_VALIDATE.CREATE){
        for (let field in validationObj) {
            validationObj[field] = validationObj[field].required()
        }
    }
    validationObj = Joi.object(validationObj)
    return validationObj
}



const validate = (type) => {
    const validationObj = createSchema(type)
    return validationData(validationObj)
}

module.exports = validate;