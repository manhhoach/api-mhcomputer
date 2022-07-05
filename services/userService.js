const models = require('./../connectDB/db');

module.exports.getByCondition = async (condition) => {
    return models.user.findAll({
        where: condition
    });
}
module.exports.findOne = async (condition, requiredPassword) => {
    if(requiredPassword)
    {
        return models.user.findOne({
            where: condition
        });
    }
    else
    {
        return models.user.findOne({
            where: condition,
            attributes: { exclude: ['password'] }
        });
    }
}



module.exports.create = async (user) => {
    return models.user.create(user);
}

module.exports.updateByCondition = async (data, condition) => {
    return models.user.update(data, { where: condition });
}

module.exports.destroyByCondition = async (condition) => {
    return models.user.destroy({ where: condition })
}