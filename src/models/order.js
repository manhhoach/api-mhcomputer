"use strict";

module.exports = (sequelize, DataTypes) => {
    const user=require('./user')(sequelize, DataTypes)
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
        phone: {
            type: DataTypes.STRING(14)
        },
        address: {
            type: DataTypes.STRING(512)
        },
        paymentMethod:{
            type: DataTypes.INTEGER(4),
            //defaultValue: 0  thanh toán tiền mặt
        },
        code: {
            type: DataTypes.STRING(128),
            unique: true
        },
        deliveryProgress:{
            type: DataTypes.STRING(512)
        },
        price:{
            type: DataTypes.INTEGER(32)
        },
        discount:{
            type: DataTypes.INTEGER(32)
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
    user.hasMany(order, {foreignKey: 'userId'});
    order.belongsTo(user);

    order.beforeCreate((ord, options)=>{
        if(ord.status!==0)
        {
            ord.code=`MH${Math.floor(Math.random() * 100)}-${ord.userId}-${ord.createdDate.getTime()}`;
            ord.deliveryProgress=JSON.stringify({
                status: ord.status,
                time: new Date()
            })
        }
        
    })


    return order;
}