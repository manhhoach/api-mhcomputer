"use strict";

module.exports = (sequelize, DataTypes) => {
    const product=require('./product')(sequelize, DataTypes);
    const show_room=require('./show_room')(sequelize, DataTypes);
    const stored_product = sequelize.define('stored_product', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER(4)
        },
        productId: {
            type: DataTypes.INTEGER(4)
        },
        showRoomId:{
            type: DataTypes.INTEGER(4)
        },
        quantity:{
            type: DataTypes.INTEGER(10),
            validate:{
                min: 0
            }
        },
        createdDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: false
    });   

    product.belongsToMany(show_room, {through: stored_product});
    show_room.belongsToMany(product, {through: stored_product});

    stored_product.belongsTo(product)
    stored_product.belongsTo(show_room)

    product.hasMany(stored_product);
    show_room.hasMany(stored_product);

    stored_product.afterValidate(function(pro, options){
        if(pro.quantity<0)
        {
            throw new Error("Quantity must be greater than 0")
        }
    })
    

    return stored_product;
}