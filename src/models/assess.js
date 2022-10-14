"use strict";

module.exports = (sequelize, DataTypes) => {
    const product=require('./product')(sequelize, DataTypes);
    const user=require('./user')(sequelize, DataTypes);
    const assess = sequelize.define('assess', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER(4)
        },
        productId: {
            type: DataTypes.INTEGER(4)
        },
        userId:{
            type: DataTypes.INTEGER(4)
        },
        content:{
            type: DataTypes.STRING(1024)
        },
        rate:{
            type: DataTypes.INTEGER(4),
            validate:{
                min: 1,
                max: 5
            }
        },
        imageUrl:{
            type: DataTypes.STRING(1024)
        },
        response:{
            type: DataTypes.STRING(1024)
        },
        status:{
            type: DataTypes.INTEGER(4),
            defaultValue: 0
        },
        createdDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: false
    });   

    product.belongsToMany(user, {through: assess});
    user.belongsToMany(product, {through: assess});

    assess.belongsTo(product)
    assess.belongsTo(user)

    product.hasMany(assess);
    user.hasMany(assess);

    return assess;
}