"use strict";

module.exports = (sequelize, DataTypes) => {
    const user=require('./user')(sequelize, DataTypes)
    const address = sequelize.define('address', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER(4)
        },
        userId: {
            type: DataTypes.INTEGER(4),
            required: true
        },
        name: {
            type: DataTypes.STRING(255),
        },
        phone:{
            type: DataTypes.STRING(20),
        },
        typeAddress:{
            type: DataTypes.INTEGER(4),
            defaultValue: 0 // 0: nhà riêng, 1: công ty
        },
        detailAddress:{
            type: DataTypes.STRING(1024),
        },
        street:{
            type: DataTypes.STRING(512),
        },
        createdDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: false
    });
    user.hasMany(address, {foreignKey: 'userId'});
    address.belongsTo(user);

   
    return address;
}