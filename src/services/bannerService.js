const models = require('./../connectDB/db');

module.exports.getAllPaging = (data) => {
    return models.banners.findAndCountAll({
        limit: data.limit,
        offset: data.offset
    });
}



module.exports.create = (data) => {
    return models.banners.create(data);
}

module.exports.destroyByCondition = (condition) => {
    return models.banners.destroy({ where: condition });
}

module.exports.updateByCondition = (data, condition) => {
    return models.banners.update(data, { where: condition });
}
