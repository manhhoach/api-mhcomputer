const { models } = require('../database/db')
const baseController = require('./baseController');

module.exports.getAllPaging = baseController.getAllPaging(models.banners)

module.exports.getAll = baseController.getAll(models.banners)

module.exports.getById = baseController.getById(models.banners)

module.exports.create = baseController.create(models.banners)

module.exports.update = baseController.update(models.banners)

module.exports.destroy = baseController.destroy(models.banners)

