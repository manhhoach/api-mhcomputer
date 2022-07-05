const models=require('./../connectDB/db');
const sequelize = require('sequelize');
const {Op}=require('sequelize')

module.exports.getAllPaging=async(data)=>{
   
    return models.product.findAll({
        where: data.condition,
        limit: data.limit,
        offset: data.offset,
        order: data.order
    });
}

module.exports.create=async(product)=>{
    return models.product.create(product);
}

module.exports.updateByCondition= async (data, condition) => {
    return models.product.update(data,{where: condition})
}

module.exports.destroyByCondition= async (condition) => {
    return models.product.destroy({where: condition})
}

module.exports.getByCondition= async(condition) => {
    return models.product.findAll({where: condition})
}
module.exports.getById= async(id) => {
    return models.product.findOne({where: {id: id}})
}