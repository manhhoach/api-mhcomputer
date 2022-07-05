const models = require('./../connectDB/db');

module.exports.getByCondition = async (condition) => {
    return models.address.findAll({ where: condition })
}

module.exports.create = async (data) => {
    return models.address.create(data);
}

module.exports.updateByCondition = async (data, condition) => {
    return models.address.update(data, { where: condition })
}

module.exports.destroyByCondition = async (condition) => {
    return models.address.destroy({ where: condition })
}