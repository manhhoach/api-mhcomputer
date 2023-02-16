const models = require('../connectDB/db');

module.exports.getByCondition = (condition) => {
    return models.show_rooms.findAll({ where: condition })
}

module.exports.create = (data) => {
    return models.show_rooms.create(data)
}

module.exports.updateByCondition = (data, condition) => {
    return models.show_rooms.update(data, { where: condition })
}

module.exports.destroyByCondition = (condition) => {
    return models.show_rooms.destroy({ where: condition })
}
