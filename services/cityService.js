const models=require('./../connectDB/db')

module.exports.getAll=async()=>{
    return models.city.findAll();
}