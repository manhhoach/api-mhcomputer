const { models } = require('../database/db')
const baseController = require('./baseController');

module.exports.create = baseController.create(models.property_values)

module.exports.update = baseController.update(models.property_values)

module.exports.delete = baseController.destroy(models.property_values)

