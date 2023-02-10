const models = require('../connectDB/db');

module.exports.getByCondition = async (condition) => {
    return models.orders.findAll({
        where: condition,
        include: [
            {
                model: models.users,
                attributes: ['id', 'fullName', 'email', 'phone']
            }
        ]
    })
}

module.exports.create = async (data) => {
    return models.orders.create(data)
}

module.exports.findOne = async (condition) => {
    return models.orders.findOne({ where: condition })
}

module.exports.updateByCondition = async (data, condition) => {
    return models.orders.update(data, { where: condition })
}

module.exports.destroyByCondition = async (condition) => {
    return models.orders.destroy({ where: condition })
}


module.exports.getAllWithOrderDetails = async (condition) => {
    return models.orders.findAll({
        where: condition,
        include: [
            {
                model: models.order_details,
                attributes:['id', 'quantity'],
                include: [
                    {
                        model: models.products,
                        attributes:['id', 'name','price', 'imageUrl']
                    },
                    {
                        model: models.show_rooms,
                        attributes:['id', 'name','address']
                    }
                ]
            }
        ],
        attributes: ['id','code','price', 'discount']
    })
}


module.exports.getProductsInCart = async (condition) => {
    return models.orders.findOne({
        where: condition,
        include: [
            {
                model: models.order_details,
                attributes:['id', 'quantity', 'createdDate'],
                include: [
                    {
                        model: models.products,
                        attributes:['id', 'name','price', 'imageUrl']
                    },
                    {
                        model: models.show_rooms,
                        attributes:['id', 'name','address']
                    }
                ]
            }
        ],
        attributes: ['id']
    })
}

module.exports.findOrCreate=async(condition, data)=>{
    return models.orders.findOrCreate({
        where: condition,
        defaults: data
    })
}