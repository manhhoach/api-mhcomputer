"use strict";

module.exports = (sequelize, DataTypes) => {
    const product = require('./product')(sequelize, DataTypes);
    const user = require('./user')(sequelize, DataTypes);
    const mark = sequelize.define('mark', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER(4)
        },
        productId: {
            type: DataTypes.INTEGER(4),
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER(4),
            primaryKey: true,
        },
        status: {
            type: DataTypes.INTEGER(4)
        },
        createdDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: false
    });




    product.hasMany(mark);
    user.hasMany(mark);

    mark.belongsTo(product)
    mark.belongsTo(user)

    // product.belongsToMany(user, {through: mark});
    // user.belongsToMany(product, {through: mark});


    return mark;
}