const baseController = require('./baseController');
const { models } = require('../database/db')

module.exports.getAll = baseController.getAll(models.cities)