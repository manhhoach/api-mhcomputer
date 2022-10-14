"use strict";

module.exports = (sequelize, DataTypes) => {
    const category=require('./category')(sequelize, DataTypes)
    const brand=require('./brand')(sequelize, DataTypes)
    const product = sequelize.define('product', {  
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER(4)
        },
        categoryId: {
            type: DataTypes.INTEGER(4)
        },
        brandId:{
            type: DataTypes.INTEGER(4)
        },
        name: {
            type: DataTypes.STRING(1024)
        },
        price: { 
            type: DataTypes.INTEGER(32)
        },
        description: {
            type: DataTypes.STRING(1024)
        },
        accessories: {
            type: DataTypes.STRING(255)
        },
        offer: {
            type: DataTypes.STRING(255)
        },
        totalSold:{
            type: DataTypes.INTEGER(4),
            defaultValue: 0
        },
        imageUrl:{
            type: DataTypes.TEXT()
        },
        createdDate: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        }
    },{
        timestamps: false  
    });



    category.hasMany(product, {foreignKey: 'categoryId'});
    product.belongsTo(category);
    
    brand.hasMany(product, {foreignKey: 'brandId'});
    product.belongsTo(brand);
    
    

    return product;
}