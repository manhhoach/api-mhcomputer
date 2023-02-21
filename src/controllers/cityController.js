const baseController = require('./baseController');
const { cities } = require('./../connectDB/db')

module.exports.getAll = baseController.getAll(cities)