const Joi = require('joi')
const {TYPE_VALIDATE} = require('./../utils/constants/typeValidate')

const createSchemaValidation = (schema, type) => {
    let validationObj={...schema}
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

module.exports = createSchemaValidation