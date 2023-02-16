const models = require('./../connectDB/db')

module.exports.getAll = () => {
    return models.cities.findAll();
}