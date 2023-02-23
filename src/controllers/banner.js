const { banners } = require('../database/db')
const baseController = require('./baseController');

module.exports.getAllPaging = baseController.getAllPaging(banners)

module.exports.getAll = baseController.getAll(banners)

module.exports.getById = baseController.getById(banners)

module.exports.create = baseController.create(banners)

module.exports.update = baseController.update(banners)

module.exports.destroy = baseController.destroy(banners)

