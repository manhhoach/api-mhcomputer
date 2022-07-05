const districtService=require('./../services/districtService')
const { responseSuccess, responseWithError } = require('./../utils/response')

module.exports.getAllByCityId= async (req, res, next) => {
    try {
        let data=await districtService.getByCondition({cityId: req.params.cityId});
        res.json(responseSuccess(data))
    }
    catch (err) {
        res.json(responseWithError(err))
    }
}