const wardService = require('./../services/wardService')
const { responseSuccess } = require('./../utils/response')
const tryCatch = require('./../utils/tryCatch');

module.exports.getAllByDistrictId = tryCatch(async (req, res, next) => {
    let data = await wardService.getByCondition({ districtId: req.params.districtId });
    res.status(200).json(responseSuccess(data))

})