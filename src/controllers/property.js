const propertyValueService = require('../services/property_value');
const baseController = require('./baseController');
const { responseSuccess } = require('../utils/response')
const tryCatch = require('../utils/tryCatch');
const { properties } = require('../database/db')

module.exports.getAll = tryCatch(async (req, res, next) => {

    let data = await propertyValueService.getPropertyByCategoryId(req.query.categoryId);
    data = data.map(ele => {
        return ele.property;
    })
    res.status(200).json(responseSuccess(data))
})

module.exports.create = baseController.create(properties)