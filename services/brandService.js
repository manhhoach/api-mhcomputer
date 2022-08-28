const models=require('./../connectDB/db');

module.exports.getByCondition=async(data)=>{
    return models.brands.findAndCountAll({
        where: data.condition,
        limit: data.limit,
        offset: data.offset
    });
}

module.exports.bulkCreate=async(data)=>{
    return models.brands.bulkCreate(data);
}

module.exports.create=async(data)=>{
    return models.brands.create(data);
}

module.exports.destroyByCondition=async(condition)=>{
    return models.brands.destroy({where: condition});
}

module.exports.updateByCondition=async(data,condition)=>{
    return models.brands.update(data, {where: condition});
}
