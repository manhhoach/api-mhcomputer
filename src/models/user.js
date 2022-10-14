"use strict";

const bcryptjs = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER(4)
        },
        email: {
            type: DataTypes.STRING(255),
            unique: true
        },
        fullName: {
            type: DataTypes.STRING(255),
            required: true,
        },
        gender: {
            type: DataTypes.INTEGER(4),
            defaultValue: 1 // nam
        },
        status: {
            type: DataTypes.INTEGER(4),
            defaultValue: 0
        },
        phone: {
            type: DataTypes.STRING(255),
            required: true,
        },
        password: {
            type: DataTypes.STRING(255),
            required: true
        },
        googleId: {
            type: DataTypes.STRING(255)
        },
        facebookId: {
            type: DataTypes.STRING(255)
        },
        createdDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: false
    });

    user.afterValidate((user, options) => { // cách này dùng dc cả cho create và update
        //console.log(user)
        if (user.password) {
            const salt = bcryptjs.genSaltSync(10);
            user.password = bcryptjs.hashSync(user.password, salt);
        }
    })

    // nếu dùng cái này thì lại phải dùng thêm beforeCreate 
    // user.beforeBulkUpdate((options) => {
    //     if (options.attributes.password) {
    //         const salt = bcryptjs.genSaltSync(10);
    //         options.attributes.password = bcryptjs.hashSync(options.attributes.password, salt);
    //     }
    // })

    return user;
}