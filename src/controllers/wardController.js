const wardService = require('./../services/wardService')
const { responseSuccess, responseWithError } = require('./../utils/response')

module.exports.getAllByDistrictId = async (req, res) => {
    try {
        let data = await wardService.getByCondition({ districtId: req.params.districtId });
        res.status(200).json(responseSuccess(data))
    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}