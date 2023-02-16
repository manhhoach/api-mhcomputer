const models = require('./../connectDB/db');

module.exports.getByCondition = (condition) => {
    return models.wards.findAll({ where: condition })
}