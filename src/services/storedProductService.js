const models = require('../connectDB/db');
const { Op } = require('sequelize')

module.exports.getByCondition = (condition) => {
    return models.stored_products.findAll({
        include: [
            {
                model: models.show_rooms,
            }
        ],
        where: { productId: condition.productId, quantity: { [Op.gt]: 0 } }
    })
}

module.exports.getAllInShowRoom = (condition) => {
    return models.stored_products.findAll({
        include: [
            {
                model: models.products,
            }
        ],
        where: { showRoomId: condition.showRoomId }
    })
}

module.exports.findOne = (condition) => {
    return models.stored_products.findOne({ where: condition })
}

module.exports.create = (data) => {
    return models.stored_products.create(data)
}

module.exports.updateByCondition = (data, condition, transaction = undefined) => {
    return models.stored_products.update(data, { where: condition, transaction: transaction })
}

module.exports.destroyByCondition = (condition) => {
    return models.stored_products.destroy({ where: condition })
}

module.exports.bulkCreate = (data) => {
    return models.stored_products.bulkCreate(data)
}

module.exports.increment = (data, condition) => {
    return models.stored_products.increment(data, { where: condition })
}