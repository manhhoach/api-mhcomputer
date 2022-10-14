const models=require('../connectDB/db');

module.exports.getByCondition=async(data)=>{
    return models.categories.findAll({ where: data});
}

module.exports.create=async(data)=>{
    return models.categories.create(data);
}

module.exports.updateByCondition= async (data, condition) => {
    return models.categories.update(data, { where: condition })
}

module.exports.destroyByCondition= async (condition)=> {
    return models.categories.destroy({where: condition})
}