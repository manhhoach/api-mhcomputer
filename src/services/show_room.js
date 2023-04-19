const {models} = require('../database/db');

module.exports.getByCondition = (condition) => {
    return models.show_rooms.findAll({ where: condition, attributes: {exclude: ['createdDate'] } })
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

module.exports.getById = (id) => {
    return models.show_rooms.findOne({ where: {id: id} })
}