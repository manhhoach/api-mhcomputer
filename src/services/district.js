const {models} = require('../database/db');

module.exports.getByCondition = (condition) => {
    return models.districts.findAll({ where: condition })
}