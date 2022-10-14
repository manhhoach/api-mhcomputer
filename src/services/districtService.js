const models=require('./../connectDB/db');

module.exports.getByCondition= async (condition)=>{
    return models.districts.findAll({where: condition})
}