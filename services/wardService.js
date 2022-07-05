const models=require('./../connectDB/db');

module.exports.getByCondition= async (condition)=>{
    return models.ward.findAll({where: condition})
}