const {models} = require('../database/db');
const sequelize = require('sequelize')
const { Op } = require('sequelize');

module.exports.getByCondition = (data) => {
    return models.order_details.findAll({
        where: { orderId: data.orderId, status: data.status },
        include: [
            {
                model: models.products
            }
        ]
    })
}

module.exports.create = (data) => {
    return models.order_details.create(data)
}

module.exports.findOne = (condition) => {
    return models.order_details.findOne({ where: condition })
}

module.exports.updateByCondition = (data, condition, transaction = undefined) => {
    return models.order_details.update(data, { where: condition, transaction: transaction })
}

module.exports.destroyByCondition = (condition) => {
    return models.order_details.destroy({ where: condition })
}

module.exports.getMyOrder = (condition) => {
    return models.order_details.findAll({
        include: [
            {
                model: models.products
            },
            {
                model: models.orders,
                where: condition
            }
        ]
    })
}

module.exports.checkOrder = (data) => {
    return models.order_details.findOne({
        where: data.order_details,
        include: { model: models.orders, where: data.order }
    })
}


module.exports.destroyByConditionOrder = (userId) => {
    return models.order_details.destroy({
        where: {
            orderId: {
                [Op.in]: sequelize.literal(`(SELECT id FROM orders WHERE userId = ${userId}) and status = 0`)
            }
        }
    })
}