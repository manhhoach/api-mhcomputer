const districtService = require('./../services/districtService')
const { responseSuccess, responseWithError } = require('./../utils/response')

module.exports.getAllByCityId = async (req, res) => {
    try {
        let data = await districtService.getByCondition({ cityId: req.params.cityId });
        res.status(200).json(responseSuccess(data))
    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}