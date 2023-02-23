const baseController = require('./baseController');
const { cities } = require('../database/db')

module.exports.getAll = baseController.getAll(cities)