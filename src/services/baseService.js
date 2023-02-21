
module.exports.getAllPaging = (model, where = {}, limit = undefined, offset = undefined, order = undefined, attributes = undefined) => {
    return model.findAndCountAll({
        where: where,
        limit: limit,
        offset: offset,
        order: order,
        attributes: attributes
    });
}

module.exports.getAll = (model, where = {}, order = undefined, attributes = undefined) => {
    return model.findAll({
        where: where,
        order: order,
        attributes: attributes
    });
}

module.exports.getById = (model, id, attributes = undefined) => {
    return model.findOne({ where: { id: id },  attributes: attributes });
}

module.exports.create = (model, data) => {
    return model.create(data);
}

module.exports.destroyByCondition = (model, condition) => {
    return model.destroy({ where: condition });
}

module.exports.updateByCondition = (model, data, condition) => {
    return model.update(data, { where: condition });
}

