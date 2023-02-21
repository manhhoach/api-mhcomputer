const propertyValueService = require('./../services/propertyValueService');
const baseController = require('./baseController');
const { responseSuccess } = require('./../utils/response')
const tryCatch = require('./../utils/tryCatch');
const AppError = require('./../utils/AppError');
const { properties } = require('./../connectDB/db')

module.exports.getAll = tryCatch(async (req, res, next) => {

    let data = await propertyValueService.getPropertyByCategoryId(req.query.categoryId);
    data = data.map(ele => {
        return ele.property;
    })
    res.status(200).json(responseSuccess(data))
})

module.exports.create = baseController.create(properties)