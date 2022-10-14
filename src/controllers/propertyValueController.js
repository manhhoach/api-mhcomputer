const propertyValueService=require('./../services/propertyValueService')
const { responseSuccess, responseWithError } =require('./../utils/response')

module.exports.getAll=async(req, res, next)=>{
    try{
       

    }
    catch(err){
        res.json(responseWithError(err))
    }
}

module.exports.create=async(req, res, next)=>{
   try{
        let data=req.body.propertyId.map(ele=>{
            return {propertyId: ele, categoryId: req.body.categoryId};
        })
        data = await models.property_value.bulkCreate(data);
        res.json(responseSuccess(data));
    }
    catch(err){
        res.json(responseWithError(err))
    }
}