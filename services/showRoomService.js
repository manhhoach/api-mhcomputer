const models=require('../connectDB/db');

module.exports.getByCondition= async(condition)=>{
    return models.show_room.findAll({where: condition})
}

module.exports.create= async(data)=>{
    return models.show_room.create(data)
}

module.exports.updateByCondition= async(data,condition)=>{
    return models.show_room.update(data, {where: condition})
}

module.exports.destroyByCondition= async(condition)=>{
    return models.show_room.destroy({where: condition})
}
