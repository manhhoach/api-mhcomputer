const models=require('../connectDB/db');
const {Op}=require('sequelize')

module.exports.getByCondition = async(condition)=>{
    return models.stored_products.findAll({
        include:[
            {
                model: models.show_rooms,
            }
        ],
        where: {productId: condition.productId, quantity: {[Op.gt]: 0} }
    })
}

module.exports.getAllInShowRoom = async(condition)=>{
    return models.stored_products.findAll({
        include:[
            {
                model: models.products,
            }
        ],
        where: {showRoomId: condition.showRoomId }
    })
}

module.exports.findOne= async (condition)=>{
    return models.stored_products.findOne({where: condition})
}

module.exports.create= async(data)=>{
    return models.stored_products.create(data)
}

module.exports.updateByCondition= async(data,condition)=>{
    return models.stored_products.update(data, {where: condition})
}

module.exports.destroyByCondition= async(condition)=>{
    return models.stored_products.destroy({where: condition})
}

module.exports.bulkCreate= async (data)=>{
    return models.stored_products.bulkCreate(data)
}

module.exports.increment = async (data, condition)=>{
    return models.stored_products.increment(data, { where: condition} )
}