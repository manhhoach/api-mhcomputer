"use strict";
const handleDeliveryProgress = (order) => {
    if (order.deliveryProgress)
        order.deliveryProgress = JSON.parse(order.deliveryProgress)
}

module.exports = (sequelize, DataTypes) => {
    const user = require('./user')(sequelize, DataTypes)
    const order = sequelize.define('order', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER(4)
        },
        userId: {
            type: DataTypes.INTEGER(4)
        },
        name: {
            type: DataTypes.STRING(512),
            required: true
        },
        phone: {
            type: DataTypes.STRING(20),
            required: true
        },
        address: {
            type: DataTypes.STRING(512),
            required: true
        },
        paymentMethod: {
            type: DataTypes.INTEGER(4),
            defaultValue: 0  // 0: cash, 1: online
        },
        code: {
            type: DataTypes.STRING(128),
            unique: true
        },
        deliveryProgress: {
            type: DataTypes.STRING(512)
        },
        price: {
            type: DataTypes.INTEGER(32),
            required: true
        },
        discount: {
            type: DataTypes.INTEGER(32)
        },
        status: {
            type: DataTypes.INTEGER(4),
            defaultValue: 0
        },
        createdDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: false
    });
    user.hasMany(order, { foreignKey: 'userId' });
    order.belongsTo(user);

    order.beforeCreate((ord) => {
        if (ord.status !== 0) {
            ord.code = `MH${Math.floor(Math.random() * 10)}${ord.userId}${ord.createdDate.getTime()}`;
            ord.deliveryProgress = JSON.stringify([{
                status: ord.status,
                time: new Date()
            }])
        }
    })
    
    order.afterFind((orders) => {
        if (Array.isArray(orders)) {
            orders.map(o => {
                handleDeliveryProgress(o)
            })
        }
        else if (orders !== null) {
            handleDeliveryProgress(orders)
        }
    })

    return order;
}