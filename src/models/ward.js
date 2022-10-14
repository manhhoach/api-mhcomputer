"use strict";

module.exports = (sequelize, DataTypes) => {
    const district= require('./district')(sequelize, DataTypes)
    const ward = sequelize.define('ward', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER(4)
        },
        name: {
            type: DataTypes.STRING(255),
        },
        districtId:{
            type: DataTypes.INTEGER(4)
        },
        createdDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: false
    });
    district.hasMany(ward, {foreignKey: 'districtId'});
    ward.belongsTo(district);
    return ward;
}