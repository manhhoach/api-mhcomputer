const models = require('./../connectDB/db');

module.exports.getByCondition = async (condition) => {
    return models.addresses.findAll({ where: condition })
}

module.exports.create = async (data) => {
    return models.addresses.create(data);
}

module.exports.updateByCondition = async (data, condition) => {
    return models.addresses.update(data, { where: condition })
}

module.exports.destroyByCondition = async (condition) => {
    return models.addresses.destroy({ where: condition })
}