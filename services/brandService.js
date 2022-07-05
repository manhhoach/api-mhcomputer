const models=require('./../connectDB/db');

module.exports.getByCondition=async(data)=>{
    return models.brand.findAndCountAll({
        where: data.condition,
        limit: data.limit,
        offset: data.offset
    });
}

module.exports.bulkCreate=async(brand)=>{
    return models.brand.bulkCreate(brand);
}

module.exports.create=async(brand)=>{
    return models.brand.create(brand);
}

module.exports.destroyByCondition=async(condition)=>{
    return models.brand.destroy({where: condition});
}

module.exports.updateByCondition=async(data,condition)=>{
    return models.brand.update(data, {where: condition});
}
