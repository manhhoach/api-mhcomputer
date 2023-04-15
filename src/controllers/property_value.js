const { property_values } = require('../database/db')
const baseController = require('./baseController');

module.exports.create = baseController.create(property_values)

module.exports.update = baseController.update(property_values)

module.exports.delete = baseController.destroy(property_values)

