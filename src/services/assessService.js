const models = require('./../connectDB/db');
const sequelize = require('sequelize');

module.exports.getByCondition = (condition, limit, offset, attributesUser = [], attributesProduct=[]) => {
    return models.assesses.findAndCountAll({
        where: condition,
        include: [
            {
                model: models.users,
                attributes: attributesUser
            },
            {
                model: models.products,
                attributes: attributesProduct
            }
        ],
        limit: limit,
        offset: offset,
        attributes: { exclude: ['userId', 'productId'] }
    })
}


module.exports.getAll = (condition, attributes=[]) => {
    return models.assesses.findAll({
        where: condition,
        attributes: attributes
    })
}

module.exports.statistical = (condition) => {
    return models.assesses.findAll({
        where: condition,
        attributes: [
            'rate',
            [sequelize.fn("COUNT", sequelize.col("id")), "total"]
        ],
        group: 'rate',
        raw: true
    })
}

module.exports.create = (data) => {
    return models.assesses.create(data);
}

module.exports.updateByCondition = (data, condition) => {
    return models.assesses.update(data, { where: condition })
}

module.exports.destroyByCondition = (condition) => {
    return models.assesses.destroy({ where: condition })
}