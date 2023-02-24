const Joi = require('joi')
const validationData = require('./validation')
const {TYPE_VALIDATE} = require('./../utils/constants/typeValidate')

const validate = (type) => {
    let productSchema = Joi.object({
        productId: Joi.number().integer().required(),
        quantity: Joi.number().integer().positive().required(),
        orderDetailId: Joi.number().integer().optional()
    })
    let schema = {
        name: Joi.string().max(512),
        phone: Joi.string().pattern(/((84|0)[3|5|7|8|9])+([0-9]{8})\b/).messages({
            'string.pattern.base': '{{#label}} with value {:[.]} fails to match the required pattern'
        }),
        products: Joi.array().items(productSchema),
        address: Joi.string().max(512),
        paymentMethod: Joi.number().integer().valid(0, 1),
        price: Joi.number().integer().positive(),
        status: Joi.number().integer().min(0).max(7),
        discount: Joi.number().integer().min(0)
    }
    if(type===TYPE_VALIDATE.CREATE){
        for (let field in schema) {
            schema[field] = schema[field].required()
        }
    }
    else if(type===TYPE_VALIDATE.UPDATE){
        let orderDetailSchema = Joi.object({
            id: Joi.number().integer().required(),
            productId: Joi.number().integer().required(),
            quantity: Joi.number().integer().positive().required(),
            showRoomId: Joi.number().integer().required()
        })
        schema={
            status: Joi.number().integer().min(0).max(7).required(),
            orderDetails: Joi.array().items(orderDetailSchema).optional()
        }
    }
    const validationObj = Joi.object(schema)
    return validationData(validationObj)
}

module.exports = validate;