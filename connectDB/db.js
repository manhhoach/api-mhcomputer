const { Sequelize, DataTypes } = require('sequelize');
let db = {};
// const sequelize = new Sequelize('sql6500353', 'sql6500353', 'tVqkxjYqJM', {
//     host: 'sql6.freemysqlhosting.net',
//     dialect: 'mysql',
//     port: '3306',
//     timezone: "+07:00",
//     define: {
//         charset: 'utf8',
//         collate: 'utf8_unicode_ci'
//     },
// });

const sequelize = new Sequelize('mhcomputer', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306',
    timezone: "+07:00",
    define: {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    },
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.brand = require('./../models/brand')(sequelize, DataTypes)

db.category = require('./../models/category')(sequelize, DataTypes)
db.product = require('./../models/product')(sequelize, DataTypes)
db.property = require('./../models/property')(sequelize, DataTypes)
db.property_value = require('./../models/property_value')(sequelize, DataTypes)
db.product_detail = require('./../models/product_detail')(sequelize, DataTypes)
db.show_room = require('./../models/show_room')(sequelize, DataTypes)
db.stored_product= require('./../models/stored_product')(sequelize, DataTypes)
db.banner= require('./../models/banner')(sequelize, DataTypes)


db.user = require('./../models/user')(sequelize, DataTypes)
db.mark=  require('./../models/mark')(sequelize, DataTypes)
db.assess= require('./../models/assess')(sequelize, DataTypes)



// order
db.order = require('./../models/order')(sequelize, DataTypes)
db.order_detail = require('./../models/order_detail')(sequelize, DataTypes)



// address
db.city = require('./../models/city')(sequelize, DataTypes);
db.district = require('./../models/district')(sequelize, DataTypes)
db.ward = require('./../models/ward')(sequelize, DataTypes)
db.address = require('./../models/address')(sequelize, DataTypes)


//sequelize.sync({alter: true})


let alterAddress = () => {
    db.city.sync({alter: true})
    db.district.sync({alter: true})
    db.ward.sync({alter: true})
    db.address.sync({alter: true})
}
// alterAddress()


let alterProduct = () => {
  //  db.category.sync({force: true})
    //db.product.sync({force: true})
    // db.property.sync({force: true})
    // db.property_value.sync({force: true})
    // db.product_detail.sync({force: true})

    //db.show_room.sync({alter: true})
   // db.stored_product.sync({alter: true})
}
//alterProduct()

let alterOrder =()=>{
  //  db.order_detail.sync({force: true})
  // db.order.sync({force: true})
    
}
//alterOrder()

//db.mark.sync({force: true})
//db.assess.sync({alter: true})
//db.user.sync({alter: true})
//db.banner.sync({alter: true})



module.exports = db;