"use strict";

module.exports = (sequelize, DataTypes) => {
    const city= require('./city')(sequelize, DataTypes)
    const district = sequelize.define('district', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER(4)
        },
        name: {
            type: DataTypes.STRING(255),
        },
        cityId:{
            type: DataTypes.INTEGER(4)
        },
        createdDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: false
    });
    city.hasMany(district, {foreignKey: 'cityId'});
    district.belongsTo(city);
    return district;
}