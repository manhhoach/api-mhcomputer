"use strict";

const splitImage=(prd)=>{
    if(prd.imageUrl) prd.imageUrl=prd.imageUrl.split(';')
}

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
            type: DataTypes.BIGINT.UNSIGNED
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
        imageCover:{
            type: DataTypes.STRING(255)
        },
        createdDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },{
        timestamps: false  
    });



    category.hasMany(product, {foreignKey: 'categoryId'});
    product.belongsTo(category);
    
    brand.hasMany(product, {foreignKey: 'brandId'});
    product.belongsTo(brand);
    
    product.beforeValidate((prd) => {
        if (prd.imageUrl) {
            prd.imageUrl = prd.imageUrl.join(';')
        }
    })

    product.afterCreate((prd) => {
        splitImage(prd)
    })

    product.afterFind(prds=>{
        if (Array.isArray(prds)) {
            prds.forEach(prd => { 
                splitImage(prd)
            })
        }
        else {
            splitImage(prds)
        }
    })

    return product;
}