"use strict";

module.exports = (sequelize, DataTypes) => {
    const order=require('./order')(sequelize, DataTypes)
    const product=require('./product')(sequelize, DataTypes)
    const show_room=require('./show_room')(sequelize, DataTypes)
    const order_detail = sequelize.define('order_detail', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER(4)
        },
        orderId: {
            type: DataTypes.INTEGER(4)
        },
        productId: {
            type: DataTypes.INTEGER(4)
        },
        quantity:{
            type: DataTypes.INTEGER(4),

        },
        showRoomId: {
            type: DataTypes.INTEGER(4),
        },
        status:{
            type: DataTypes.INTEGER(4),
            defaultValue:0
        },
        createdDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: false
    });

    product.belongsToMany(order, {through: order_detail})
    order.belongsToMany(product, {through: order_detail})
    

    order_detail.belongsTo(product)
    order_detail.belongsTo(order)
    order_detail.belongsTo(show_room)

    product.hasMany(order_detail);
    order.hasMany(order_detail);
    show_room.hasMany(order_detail);


    return order_detail;
}