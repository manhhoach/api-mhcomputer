const { models } = require('../database/db')
const baseController = require('./baseController');

module.exports.getAll = baseController.getAll(models.brands)

module.exports.getAllPaging = baseController.getAllPaging(models.brands)

module.exports.getById = baseController.getById(models.brands)

module.exports.create = baseController.create(models.brands)

module.exports.update = baseController.update(models.brands)

module.exports.destroy = baseController.destroy(models.brands)

