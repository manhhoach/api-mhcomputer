"use strict";

module.exports = (sequelize, DataTypes) => {
    const property=require("./property")(sequelize, DataTypes);
    const product=require("./product")(sequelize, DataTypes);
    const product_detail = sequelize.define('product_detail', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER(4)
        },
        productId: {
            type: DataTypes.INTEGER(4),
        },
        propertyId:{
            type: DataTypes.INTEGER(4),
        },
        value:{
            type: DataTypes.STRING(1024),
        },
        createdDate: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        }
    },
    {
        timestamps: false
    });
    product.belongsToMany(property, {through: product_detail})
    property.belongsToMany(product, {through: product_detail})

    product_detail.belongsTo(product)
    product_detail.belongsTo(property)

    product.hasMany(product_detail);
    property.hasMany(product_detail);

    return product_detail;
}