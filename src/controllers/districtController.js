const districtService = require('./../services/districtService')
const { responseSuccess } = require('./../utils/response')
const tryCatch = require('./../utils/tryCatch');

module.exports.getAllByCityId = tryCatch(async (req, res, next) => {
    let data = await districtService.getByCondition({ cityId: req.params.cityId });
    res.status(200).json(responseSuccess(data))
})