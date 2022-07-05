const models=require('./../connectDB/db');

module.exports.getByCondition=async(data)=>{
    return models.banner.findAndCountAll({
        where: data.condition,
        limit: data.limit,
        offset: data.offset
    });
}


module.exports.create=async(banner)=>{
    return models.banner.create(banner);
}

module.exports.destroyByCondition=async(condition)=>{
    return models.banner.destroy({where: condition});
}

module.exports.updateByCondition=async(data,condition)=>{
    return models.banner.update(data, {where: condition});
}
