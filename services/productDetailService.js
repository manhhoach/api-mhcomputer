const models=require('./../connectDB/db');
const {Op}=require('sequelize')
const sequelize = require('sequelize')
const { QueryTypes } = require('sequelize');

module.exports.getByCondition=async(condition)=>{
    return models.product_detail.findAll({
        where: condition,
        include: models.property
    });
}

module.exports.query = async (stringQuery)=>{
    return  models.sequelize.query(stringQuery, {type: QueryTypes.SELECT})
}

module.exports.create=async(product_detail)=>{
    return models.product_detail.create(product_detail);
}

module.exports.bulkCreate=async(product_detail)=>{
    return models.product_detail.bulkCreate(product_detail);
}

module.exports.updateByCondition= async (data, condition) => {
    return models.product_detail.update(data,{ where: condition});
}

module.exports.destroyByCondition= async (condition) => {
    return models.product_detail.destroy({where: condition});
}
