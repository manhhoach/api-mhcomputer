const addressService = require('./../services/addressService');
const { responseSuccess, responseWithError} = require('./../utils/response');

const responseAddress=(address)=>{
    let detail=JSON.parse(address.detailAddress);
    return  {
        id: address.id,
        name: address.name,
        phone: address.phone,
        typeAddress: address.typeAddress,
        address:`${address.street}, ${detail.ward.name}, ${detail.district.name}, ${detail.city.name}`,
        createdDate: address.createdDate
    };

}
module.exports.getAll= async (req, res, next) => {
    try{
        let data=await addressService.getByCondition({userId: req.user.id});
        data=data.map(ele=>responseAddress(ele.dataValues));
        res.json(responseSuccess(data))
    }
    catch(err){
        res.json(responseWithError(err));
    }
}

module.exports.create= async (req, res, next) => {
    try{
        let body={
            userId: req.user.id,
            name: req.body.name,
            phone: req.body.phone,
            typeAddress: req.body.typeAddress,
            detailAddress: JSON.stringify(req.body.detailAddress),
            street: req.body.street
        }
        let data=await addressService.create(body);
        res.json(responseSuccess(responseAddress(data.dataValues)))
    }
    catch(err){
        res.json(responseWithError(err));
    }
}

module.exports.update= async (req, res, next) => {
    try{
        let body={ ...req.body}
        body.detailAddress=JSON.stringify(req.body.detailAddress);
        
        let data=await addressService.updateByCondition(body, {id: req.params.id, userId: req.user.id});
        if(data[0]===1)
        {
            data=await addressService.getByCondition({id: req.params.id});
            res.json(responseSuccess(responseAddress(data[0].dataValues)))
        }
        else
        {
            res.json(responseWithError())
        }
    }
    catch(err){
        res.json(responseWithError(err));
    }
}

module.exports.destroy = async (req, res, next) => {
    try{
        let data=await addressService.destroyByCondition({id: req.params.id, userId: req.user.id});
        if(data===1)
        {
            res.json(responseSuccess())
        }
        else
        {
            res.json(responseWithError())
        }
    }
    catch(err){
        res.json(responseWithError(err));
    }
}