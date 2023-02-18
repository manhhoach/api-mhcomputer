const models = require('./../connectDB/db');
const { QueryTypes } = require('sequelize');

module.exports.getByCondition = (condition) => {
    return models.product_details.findAll({
        where: condition,
        include: { model: models.properties, attributes: ['id', 'name'] }
    });
}

module.exports.query = (stringQuery) => {
    return models.sequelize.query(stringQuery, { type: QueryTypes.SELECT })
}

module.exports.create = (product_detail) => {
    return models.product_details.create(product_detail);
}

module.exports.bulkCreate = (data) => {
    return models.product_details.bulkCreate(data);
}

module.exports.updateByCondition = (data, condition) => {
    return models.product_details.update(data, { where: condition });
}

module.exports.destroyByCondition = (condition) => {
    return models.product_details.destroy({ where: condition });
}
