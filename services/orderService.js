const models=require('../connectDB/db');

module.exports.getByCondition= async(condition)=>{
    return models.order.findAll({
        where: condition,
        include: [
            {
                model: models.user,
                attributes: ['id', 'fullName','email','phone']

            }
        ]
    })
}

module.exports.create= async(data)=>{
    return models.order.create(data)
}

module.exports.findOne= async(condition)=>{
    return models.order.findOne({where: condition})
}

module.exports.updateByCondition= async(data,condition)=>{
    return models.order.update(data, {where: condition})
}

module.exports.destroyByCondition= async(condition)=>{
    return models.order.destroy({where: condition})
}
