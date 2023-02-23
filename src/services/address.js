const models = require('./../database/db');

module.exports.getByCondition = (condition) => {
    return models.addresses.findAll({ where: condition })
}

module.exports.create = (data) => {
    return models.addresses.create(data);
}

module.exports.updateByCondition = (data, condition) => {
    return models.addresses.update(data, { where: condition })
}

module.exports.destroyByCondition = (condition) => {
    return models.addresses.destroy({ where: condition })
}

module.exports.getById = (id) => {
    return models.addresses.findOne({ where: {id: id} })
}