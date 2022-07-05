"use strict";

module.exports = (sequelize, DataTypes) => {
    const brand = sequelize.define('brand', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER(4)
        },
        name: {
            type: DataTypes.STRING(255)
        },
        imageUrl: { 
            type: DataTypes.STRING(1024) 
        },
        createdDate: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        }
    }, {
        timestamps: false
    });

    return brand;
}