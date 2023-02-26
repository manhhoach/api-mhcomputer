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
        email:{
            type: DataTypes.STRING(128),
        },
        phone:{
            type: DataTypes.STRING(20),
        },
        address:{
            type: DataTypes.STRING(512),
        },
        urlMap: {
            type: DataTypes.STRING(1024),
        },
        imageUrl:{
            type: DataTypes.STRING(512),
        },
        openTime:{
            type: DataTypes.STRING(128),
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