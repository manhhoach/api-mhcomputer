const models=require('./../connectDB/db');

module.exports.getByCondition= async (condition)=>{
    return models.wards.findAll({where: condition})
}