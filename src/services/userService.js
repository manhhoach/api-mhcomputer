const models = require('./../connectDB/db');

module.exports.getByCondition = async (condition) => {
    return models.users.findAll({
        where: condition
    });
}
module.exports.findOne = async (condition, requiredPassword=false) => {
    return models.users.findOne({
            where: condition,
            attributes: requiredPassword? undefined : { exclude: ['password'] }
    });
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

module.exports.getOne=(condition)=>{
    return models.users.findOne({ where: condition, attributes: ['id','fullName', 'status']})
}