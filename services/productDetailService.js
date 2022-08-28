const models=require('./../connectDB/db');
const { QueryTypes } = require('sequelize');

module.exports.getByCondition=async(condition)=>{
    return models.product_details.findAll({
        where: condition,
        include: models.properties
    });
}

module.exports.query = async (stringQuery)=>{
    return  models.sequelize.query(stringQuery, {type: QueryTypes.SELECT})
}

module.exports.create=async(product_detail)=>{
    return models.product_details.create(product_detail);
}

module.exports.bulkCreate=async(data)=>{
    return models.product_details.bulkCreate(data);
}

module.exports.updateByCondition= async (data, condition) => {
    return models.product_details.update(data,{ where: condition});
}

module.exports.destroyByCondition= async (condition) => {
    return models.product_details.destroy({where: condition});
}
