const models=require('./../connectDB/db');

module.exports.getByCondition=async(condition)=>{
    return models.properties.findAll({where: condition});
}

module.exports.create=async(data)=>{
    return models.properties.create(data);
}

module.exports.bulkCreate=async(data)=>{
    return models.properties.bulkCreate(data);
}

module.exports.updateByCondition= async (data, condition) => {
    return models.properties.update(data,{ where: condition});
}

module.exports.destroyByCondition= async (condition) => {
    return models.properties.destroy({where: condition});
}
