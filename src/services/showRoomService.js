const models=require('../connectDB/db');

module.exports.getByCondition= async(condition)=>{
    return models.show_rooms.findAll({where: condition})
}

module.exports.create= async(data)=>{
    return models.show_rooms.create(data)
}

module.exports.updateByCondition= async(data,condition)=>{
    return models.show_rooms.update(data, {where: condition})
}

module.exports.destroyByCondition= async(condition)=>{
    return models.show_rooms.destroy({where: condition})
}
