"use strict";

module.exports = (sequelize, DataTypes) => {
    const category = sequelize.define('category', {
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
        parentId: {
            type: DataTypes.INTEGER(4)
        },
        createdDate: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        }
    }, {
        timestamps: false
    });

    return category;
}