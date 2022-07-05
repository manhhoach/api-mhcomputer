const models=require('./../connectDB/db');

module.exports.getByCondition=(condition, limit, offset) => {
    return models.mark.findAll({
        where: condition,
        include:[
            {
                model: models.product  
            },
            {
                model: models.user     
            }
        ],
        limit: limit,
        offset: offset
    })
}

module.exports.create = (data)=>{
    return models.mark.create(data);
}

module.exports.updateByCondition = (data, condition)=>{
    return models.mark.update(data,{where: condition})
}

module.exports.destroyByCondition = (condition)=>{
    return models.mark.destroy({where: condition})
}