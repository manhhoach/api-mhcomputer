const models = require('../connectDB/db');

module.exports.getByCondition = async (data) => {
    return models.order_details.findAll({
        where: { orderId: data.orderId, status: data.status },
        include: [
            {
                model: models.products
            }
        ]
    })
}

module.exports.create = async (data) => {
    return models.order_details.create(data)
}

module.exports.findOne = async (condition) => {
    return models.order_details.findOne({ where: condition })
}

module.exports.updateByCondition = async (data, condition) => {
    return models.order_details.update(data, { where: condition })
}

module.exports.destroyByCondition = async (condition) => {
    return models.order_details.destroy({ where: condition })
}

module.exports.getMyOrder = async (condition) => {
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