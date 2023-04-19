const {models} = require('../database/db');


module.exports.getAll = () => {
    return models.property_values.findAll();
}

module.exports.create = (data) => {
    return models.property_values.create(data);
}

module.exports.bulkCreate = (data) => {
    return models.property_values.bulkCreate(data);
}

module.exports.getPropertyByCategoryId = (category_id) => {
    return models.property_values.findAll({
        where: {
            categoryId: category_id
        },
        include: models.properties

    })
}

module.exports.destroy = (condition) => {
    return models.property_values.destroy({where: condition});
}