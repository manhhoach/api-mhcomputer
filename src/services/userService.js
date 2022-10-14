const models = require('./../connectDB/db');

module.exports.getByCondition = async (condition) => {
    return models.users.findAll({
        where: condition
    });
}
module.exports.findOne = async (condition, requiredPassword) => {
    if(requiredPassword)
    {
        return models.users.findOne({
            where: condition
        });
    }
    else
    {
        return models.users.findOne({
            where: condition,
            attributes: { exclude: ['password'] }
        });
    }
}



module.exports.create = async (user) => {
    return models.users.create(user);
}

module.exports.updateByCondition = async (data, condition) => {
    return models.users.update(data, { where: condition });
}

module.exports.destroyByCondition = async (condition) => {
    return models.users.destroy({ where: condition })
}