const models=require('./../connectDB/db');

module.exports.getByCondition=(condition, limit, offset) => {
    return models.assess.findAll({
        where: condition.assess,
        include:[
            {
                model: models.product,
                where: condition.product
            },
            {
                model: models.user,
                where: condition.user
            }
        ],
        limit: limit,
        offset: offset
    })
}

module.exports.create = (data)=>{
    return models.assess.create(data);
}

module.exports.updateByCondition = (data, condition)=>{
    return models.assess.update(data,{where: condition})
}

module.exports.destroyByCondition = (condition)=>{
    return models.assess.destroy({where: condition})
}