const propertyValueService = require('./../services/propertyValueService')
const { responseSuccess } = require('./../utils/response')
const tryCatch = require('./../utils/tryCatch');
const AppError = require('./../utils/AppError');

module.exports.getAll = tryCatch(async (req, res, next) => {
})

module.exports.create = tryCatch(async (req, res, next) => {

    let data = req.body.propertyId.map(ele => {
        return { propertyId: ele, categoryId: req.body.categoryId };
    })
    data = await propertyValueService.bulkCreate(data);
    res.status(200).json(responseSuccess(data));

})