const {models} = require('../database/db');

module.exports.getByCondition = (condition, limit, offset) => {
    return models.marks.findAndCountAll({
        where: condition,
        include: {
            model: models.products,
            attributes: ['name', 'price', 'imageCover']
        },
        limit: limit,
        offset: offset
    })
}

module.exports.create = (data) => {
    return models.marks.create(data);
}

module.exports.updateByCondition = (data, condition) => {
    return models.marks.update(data, { where: condition })
}

module.exports.destroyByCondition = (condition) => {
    return models.marks.destroy({ where: condition })
}