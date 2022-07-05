const models = require('../connectDB/db');

module.exports.getByCondition = async (data) => {
    return models.order_detail.findAll({
        where: { orderId: data.orderId, status: data.status },
        include: [
            {
                model: models.product
            }
        ]
    })
}

module.exports.create = async (data) => {
    return models.order_detail.create(data)
}

module.exports.findOne = async (condition) => {
    return models.order_detail.findOne({ where: condition })
}

module.exports.updateByCondition = async (data, condition) => {
    return models.order_detail.update(data, { where: condition })
}

module.exports.destroyByCondition = async (condition) => {
    return models.order_detail.destroy({ where: condition })
}

module.exports.getMyOrder = async (condition) => {
    return models.order_detail.findAll({
        include: [
            {
                model: models.product
            },
            {
                model: models.order,
                where: condition
            }
        ]
    })
}

module.exports.checkOrder = (data) => {
    return models.order_detail.findOne({
        where: data.order_detail,
        include: { model: models.order, where: data.order }
    })
}