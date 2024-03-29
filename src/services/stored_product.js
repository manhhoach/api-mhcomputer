const {models} = require('../database/db');
const { Op } = require('sequelize')

module.exports.getByCondition = (condition) => {
    return models.stored_products.findAll({
        include: [
            {
                model: models.show_rooms,
                attributes: ['name', 'phone', 'address', 'urlMap', 'openTime']
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
                attributes: ['id', 'name', 'price', 'imageCover']
            }
        ],
        where: condition,
        attributes: ['id', 'quantity']
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


module.exports.findOrCreate = (condition, data) => {
    return models.stored_products.findOrCreate({
        where: condition,
        defaults: data
    })
}