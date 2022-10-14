const cityService =require('./../services/cityService');
const { responseSuccess, responseWithError } = require('./../utils/response')

module.exports.getAll=async(req,res,next)=>{
    try {
        let data=await cityService.getAll();
        res.json(responseSuccess(data))
    }
    catch (err) {
        res.json(responseWithError(err))
    }
}