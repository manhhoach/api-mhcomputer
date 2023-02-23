const models = require('../database/db');

module.exports.getByCondition = (condition) => {
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

module.exports.create = (data) => {
    return models.orders.create(data)
}

module.exports.findOne = (condition) => {
    return models.orders.findOne({ where: condition })
}

module.exports.updateByCondition = (data, condition, transaction=undefined) => {
    return models.orders.update(data, { where: condition, transaction: transaction })
}

module.exports.destroyByCondition = (condition) => {
    return models.orders.destroy({ where: condition })
}


module.exports.getAllWithOrderDetails = (condition, attributes, attributes_order_detail, attributes_product, attributes_showroom=undefined ) => {
    return models.orders.findAll({
        where: condition,
        include: [
            {
                model: models.order_details,
                attributes: attributes_order_detail, // ['id', 'quantity'],
                include: [
                    {
                        model: models.products,
                        attributes: attributes_product // ['id', 'name', 'price', 'imageUrl']
                    },
                    {
                        model: models.show_rooms,
                        attributes: attributes_showroom // ['id', 'name', 'address']
                    }
                ]
            }
        ],
        attributes: attributes, // ['id', 'code', 'price', 'discount'],
        orderby: [['createdDate', 'DESC']]
    })
}


module.exports.getProductsInCart = (condition, attributes, attributes_order_detail, attributes_product, attributes_showroom=undefined ) => {
    return models.orders.findOne({
        where: condition,
        include: [
            {
                model: models.order_details,
                attributes: attributes_order_detail,
                include: [
                    {
                        model: models.products,
                        attributes: attributes_product 
                    },
                    {
                        model: models.show_rooms,
                        attributes: attributes_showroom
                    }
                ]
            }
        ],
        attributes: attributes,
        orderby: [['createdDate', 'DESC']]
    })
}

module.exports.findOrCreate = (condition, data) => {
    return models.orders.findOrCreate({
        where: condition,
        defaults: data
    })
}