const models=require('../connectDB/db');

module.exports.getByCondition=async(data)=>{
    return models.category.findAll({ where: data});
}

module.exports.create=async(category)=>{
    return models.category.create(category);
}

module.exports.updateByCondition= async (data, condition) => {
    return models.category.update(data, { where: condition })
}

module.exports.destroyByCondition= async (condition)=> {
    return models.category.destroy({where: condition})
}