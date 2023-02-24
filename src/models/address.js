"use strict";
const responseAddress = (address) => {
    let detail_address = JSON.parse(address.detailAddress);
    address.detailAddress = detail_address;
    address.address = `${address.street}, ${detail_address.ward.name}, ${detail_address.district.name}, ${detail_address.city.name}`;
}

module.exports = (sequelize, DataTypes) => {
    const user = require('./user')(sequelize, DataTypes)
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
            required: true
        },
        phone: {
            type: DataTypes.STRING(20),
            required: true
        },
        typeAddress: {
            type: DataTypes.INTEGER(4),
            defaultValue: 0 // 0: nhà riêng, 1: công ty
        },
        detailAddress: {
            type: DataTypes.STRING(1024),
            required: true
        },
        street: {
            type: DataTypes.STRING(512),
            required: true
        },
        createdDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: false
    });
    user.hasMany(address, { foreignKey: 'userId' });
    address.belongsTo(user);

    address.beforeValidate((adr) => {
        if (adr.detailAddress) {
            adr.detailAddress = JSON.stringify(adr.detailAddress);
        }
    })
    address.afterFind((adrs) => {
        if (Array.isArray(adrs)) {
            adrs.forEach(adr => { 
                responseAddress(adr)
            })
        }
        else if(adrs!==null) {
            responseAddress(adrs)
        }
    })

    address.afterCreate((adr) => {
        responseAddress(adr)
    })

    return address;
}