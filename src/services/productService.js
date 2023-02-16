const models = require('./../connectDB/db');


module.exports.getAll = (data) => {

    return models.products.findAll({
        where: data.condition,
        limit: data.limit,
        offset: data.offset,
        order: data.order
    });
}

module.exports.getAllPaging = (data) => {

    return models.products.findAndCountAll({
        where: data.condition,
        limit: data.limit,
        offset: data.offset,
        order: data.order
    });
}

module.exports.create = (data) => {
    return models.products.create(data);
}

module.exports.updateByCondition = (data, condition) => {
    return models.products.update(data, { where: condition })
}

module.exports.destroyByCondition = (condition) => {
    return models.products.destroy({ where: condition })
}

module.exports.getByCondition = (condition) => {
    return models.products.findAll({ where: condition })
}
module.exports.getById = (id) => {
    return models.products.findOne({ where: { id: id } })
}