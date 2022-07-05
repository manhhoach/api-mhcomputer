const models=require('./../connectDB/db');

module.exports.getByCondition=async(condition)=>{
    return models.property.findAll({where: condition});
}

module.exports.create=async(property)=>{
    return models.property.create(property);
}

module.exports.bulkCreate=async(property)=>{
    return models.property.bulkCreate(property);
}

module.exports.updateByCondition= async (data, condition) => {
    return models.property.update(data,{ where: condition});
}

module.exports.destroyByCondition= async (condition) => {
    return models.property.destroy({where: condition});
}
