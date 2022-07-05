"use strict";

module.exports = (sequelize, DataTypes) => {
    const show_room = sequelize.define('show_room', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER(4)
        },
        name: {
            type: DataTypes.STRING(255),
        },
        phone:{
            type: DataTypes.STRING(20),
        },
        address:{
            type: DataTypes.STRING(1024),
        },
        createdDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: false
    });   
    return show_room;
}