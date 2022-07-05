"use strict";

module.exports = (sequelize, DataTypes) => {
    const category=require('./category')(sequelize, DataTypes);
    const banner = sequelize.define('banner', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER(4)
        },
        categoryId: {
            type: DataTypes.INTEGER(4)
        },
        imageUrl:{
            type: DataTypes.STRING(1024)
        },
        createdDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: false
    });   

    category.hasMany(banner);
    banner.belongsTo(category)

    return banner;
}