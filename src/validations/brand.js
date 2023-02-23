const Joi = require('joi')
const validationData = require('./validation')
const {TYPE_VALIDATE} = require('./../utils/constants/typeValidate')

const createSchema = (type) => {
    let validationObj = {
        name: Joi.string().max(255),
        imageUrl: Joi.string().max(1024)
    }
    if (type === TYPE_VALIDATE.UPDATE) {
        for (let field in validationObj) {
            validationObj[field] = validationObj[field].optional()
        }
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