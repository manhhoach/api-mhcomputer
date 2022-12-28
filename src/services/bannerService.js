const models=require('./../connectDB/db');

module.exports.getAllPaging=async(data)=>{
    return models.banners.findAndCountAll({
        limit: data.limit,
        offset: data.offset
    });
}



module.exports.create=async(data)=>{
    return models.banners.create(data);
}

module.exports.destroyByCondition=async(condition)=>{
    return models.banners.destroy({where: condition});
}

module.exports.updateByCondition=async(data,condition)=>{
    return models.banners.update(data, {where: condition});
}
