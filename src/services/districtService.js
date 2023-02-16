const models = require('./../connectDB/db');

module.exports.getByCondition = (condition) => {
    return models.districts.findAll({ where: condition })
}