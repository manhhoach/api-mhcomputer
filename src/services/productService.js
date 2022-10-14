const models=require('./../connectDB/db');


module.exports.getAllPaging=async(data)=>{
   
    return models.products.findAll({
        where: data.condition,
        limit: data.limit,
        offset: data.offset,
        order: data.order
    });
}

module.exports.create=async(data)=>{
    return models.products.create(data);
}

module.exports.updateByCondition= async (data, condition) => {
    return models.products.update(data,{where: condition})
}

module.exports.destroyByCondition= async (condition) => {
    return models.products.destroy({where: condition})
}

module.exports.getByCondition= async(condition) => {
    return models.products.findAll({where: condition})
}
module.exports.getById= async(id) => {
    return models.products.findOne({where: {id: id}})
}