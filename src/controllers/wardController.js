const wardService=require('./../services/wardService')
const { responseSuccess, responseWithError } = require('./../utils/response')

module.exports.getAllByDistrictId= async (req, res, next) => {
    try {
        let data=await wardService.getByCondition({districtId: req.params.districtId});
        res.json(responseSuccess(data))
    }
    catch (err) {
        res.json(responseWithError(err))
    }
}