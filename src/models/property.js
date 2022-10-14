"use strict";

module.exports = (sequelize, DataTypes) => {

    const property = sequelize.define('property', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER(4)
        },
        name: {
            type: DataTypes.STRING(255)
        },
        extendName: {
            type: DataTypes.STRING(255)
        },
        createdDate: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        }
    },
        {
            timestamps: false
        }
    );

    return property;
}