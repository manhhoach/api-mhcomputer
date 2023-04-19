const {models} = require('../database/db');

module.exports.getByCondition = (condition) => {
    return models.wards.findAll({ where: condition })
}