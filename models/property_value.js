"use strict";

module.exports = (sequelize, DataTypes) => {
    const property=require("./property")(sequelize, DataTypes);
    const category=require("./category")(sequelize, DataTypes);
    const property_value = sequelize.define('property_value', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER(4)
        },
        categoryId: {
            type: DataTypes.INTEGER(4),
        },
        propertyId:{
            type: DataTypes.INTEGER(4),
        },
        createdDate: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        }
    },
    {
        timestamps: false
    });

    // option 1
    category.belongsToMany(property, {through: property_value})
    property.belongsToMany(category, {through: property_value})
    property_value.belongsTo(category)
    property_value.belongsTo(property)
    category.hasMany(property_value)
    property.hasMany(property_value)


    // option 2
    // category.hasMany(property_value)
    // property.hasMany(property_value)
    // property_value.belongsTo(category)
    // property_value.belongsTo(property)



    return property_value;
}
// note: khi liên kết bảng many to many thì chỉ là liên kết 1 chiều: 
//ví dụ x---->a<----y => chi có thể truy vấn từ bảng a sang 2 bảng x, y, chứ k thể từ x liên kết sang a