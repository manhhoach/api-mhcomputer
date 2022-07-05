const models=require('./../connectDB/db');

module.exports.getByCondition= async (condition)=>{
    return models.district.findAll({where: condition})
}