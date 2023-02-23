const { brands } = require('../database/db')
const baseController = require('./baseController');

module.exports.getAll = baseController.getAll(brands)

module.exports.getAllPaging = baseController.getAllPaging(brands)

module.exports.getById = baseController.getById(brands)

module.exports.create = baseController.create(brands)

module.exports.update = baseController.update(brands)

module.exports.destroy = baseController.destroy(brands)

