const models = require('./../connectDB/db');

module.exports.getByCondition = (condition, limit, offset) => {
    return models.brands.findAndCountAll({
        where: condition,
        limit: limit,
        offset: offset,
        attributes: ['id', 'name', 'imageUrl']
    });
}

module.exports.getById = (id) => {
    return models.brands.findOne({ where: { id: id }, attributes: ['id', 'name', 'imageUrl'] })
}

module.exports.bulkCreate = (data) => {
    return models.brands.bulkCreate(data);
}

module.exports.create = (data) => {
    return models.brands.create(data);
}

module.exports.destroyByCondition = (condition) => {
    return models.brands.destroy({ where: condition });
}

module.exports.updateByCondition = (data, condition) => {
    return models.brands.update(data, { where: condition });
}
