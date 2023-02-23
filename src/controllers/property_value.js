const propertyValueService = require('../services/property_value')
const { responseSuccess } = require('../utils/response')
const tryCatch = require('../utils/tryCatch');

module.exports.getAll = tryCatch(async (req, res, next) => {
})

module.exports.create = tryCatch(async (req, res, next) => {

    let data = req.body.propertyId.map(ele => {
        return { propertyId: ele, categoryId: req.body.categoryId };
    })
    data = await propertyValueService.bulkCreate(data);
    res.status(200).json(responseSuccess(data));

})