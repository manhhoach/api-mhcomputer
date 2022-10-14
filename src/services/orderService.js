const models=require('../connectDB/db');

module.exports.getByCondition= async(condition)=>{
    return models.orders.findAll({
        where: condition,
        include: [
            {
                model: models.users,
                attributes: ['id', 'fullName','email','phone']

            }
        ]
    })
}

module.exports.create= async(data)=>{
    return models.orders.create(data)
}

module.exports.findOne= async(condition)=>{
    return models.orders.findOne({where: condition})
}

module.exports.updateByCondition= async(data,condition)=>{
    return models.orders.update(data, {where: condition})
}

module.exports.destroyByCondition= async(condition)=>{
    return models.orders.destroy({where: condition})
}
