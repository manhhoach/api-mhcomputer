const models=require('./../connectDB/db');

module.exports.getByCondition=(condition, limit, offset) => {
    return models.assesses.findAll({
        where: condition.assess,
        include:[
            {
                model: models.products,
                where: condition.product
            },
            {
                model: models.users,
                where: condition.user
            }
        ],
        limit: limit,
        offset: offset
    })
}

module.exports.create = (data)=>{
    return models.assesses.create(data);
}

module.exports.updateByCondition = (data, condition)=>{
    return models.assesses.update(data,{where: condition})
}

module.exports.destroyByCondition = (condition)=>{
    return models.assesses.destroy({where: condition})
}