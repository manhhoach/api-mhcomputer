const models = require('./../connectDB/db');

module.exports.getByCondition = (condition) => {
    return models.properties.findAll({ where: condition });
}

module.exports.create = (data) => {
    return models.properties.create(data);
}

module.exports.bulkCreate = (data) => {
    return models.properties.bulkCreate(data);
}

module.exports.updateByCondition = (data, condition) => {
    return models.properties.update(data, { where: condition });
}

module.exports.destroyByCondition = (condition) => {
    return models.properties.destroy({ where: condition });
}
