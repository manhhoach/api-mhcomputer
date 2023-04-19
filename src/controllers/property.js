const propertyValueService = require('../services/property_value');
const baseController = require('./baseController');
const { responseSuccess } = require('../utils/response')
const tryCatch = require('../utils/tryCatch');
const { models } = require('../database/db')
const propertyService=require('../services/property')
const productDetailService=require('./../services/product_detail')
const CONSTANT_MESSAGES = require('../utils/constants/messages');


module.exports.getAll = tryCatch(async (req, res, next) => {
    let data = await propertyValueService.getPropertyByCategoryId(req.query.categoryId);
    data = data.map(ele => {
        return ele.property;
    })
    res.status(200).json(responseSuccess(data))
})

module.exports.create = baseController.create(models.properties)

module.exports.update = baseController.update(models.properties)

module.exports.delete = tryCatch(async (req, res, next) => {
    await Promise.all([
        propertyService.destroyByCondition({id: req.params.id}),
        propertyValueService.destroy({propertyId: req.params.id}),
        productDetailService.destroyByCondition({propertyId: req.params.id})
    ])
    res.status(200).json(responseSuccess(CONSTANT_MESSAGES.DELETE_SUCCESSFULLY))
})