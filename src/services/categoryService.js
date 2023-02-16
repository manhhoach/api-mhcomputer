const models = require('../connectDB/db');

module.exports.getByCondition = (data) => {
    return models.categories.findAll({
        where: data,
        include: [
            { model: models.categories, as: 'category_children', attributes: ['id', 'name', 'imageUrl', 'parentId'] },
           // { model: models.categories, as: 'category_parents' }
        ],
        attributes: ['id', 'name', 'imageUrl', 'parentId']
    });
}

module.exports.create = (data) => {
    return models.categories.create(data);
}

module.exports.updateByCondition = (data, condition) => {
    return models.categories.update(data, { where: condition })
}

module.exports.destroyByCondition = (condition) => {
    return models.categories.destroy({ where: condition })
}

module.exports.getById = (id) => {
    return models.categories.findOne({ where: { id: id } });
}