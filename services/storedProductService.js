const models=require('../connectDB/db');
const {Op}=require('sequelize')

module.exports.getByCondition = async(condition)=>{
    return models.stored_product.findAll({
        include:[
            {
                model: models.show_room,
            }
        ],
        where: {productId: condition.productId, quantity: {[Op.gt]: 0} }
    })
}

module.exports.getAllInShowRoom = async(condition)=>{
    return models.stored_product.findAll({
        include:[
            {
                model: models.product,
            }
        ],
        where: {showRoomId: condition.showRoomId }
    })
}

module.exports.findOne= async (condition)=>{
    return models.stored_product.findOne({where: condition})
}

module.exports.create= async(data)=>{
    return models.stored_product.create(data)
}

module.exports.updateByCondition= async(data,condition)=>{
    return models.stored_product.update(data, {where: condition})
}

module.exports.destroyByCondition= async(condition)=>{
    return models.stored_product.destroy({where: condition})
}

module.exports.bulkCreate= async (data)=>{
    return models.stored_product.bulkCreate(data)
}

module.exports.increment = async (data, condition)=>{
    return models.stored_product.increment(data, { where: condition} )
}