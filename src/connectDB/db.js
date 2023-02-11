const { Sequelize, DataTypes } = require('sequelize');
let db = {};
const { DATABASE } = require('./../config/mysql')

const sequelize = new Sequelize(DATABASE.DB_DBNAME, DATABASE.DB_USERNAME, DATABASE.DB_PASSWORD, {
    host: DATABASE.DB_HOST,
    dialect: DATABASE.DB_DIALECT,
    port: DATABASE.DB_PORT,
    timezone: "+07:00",
    define: {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    }
});



db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.brands = require('../models/brand')(sequelize, DataTypes)

db.categories = require('../models/category')(sequelize, DataTypes)
db.products = require('../models/product')(sequelize, DataTypes)
db.properties = require('../models/property')(sequelize, DataTypes)
db.property_values = require('../models/property_value')(sequelize, DataTypes)
db.product_details = require('../models/product_detail')(sequelize, DataTypes)
db.show_rooms = require('../models/show_room')(sequelize, DataTypes)
db.stored_products = require('../models/stored_product')(sequelize, DataTypes)
db.banners = require('../models/banner')(sequelize, DataTypes)


db.users = require('../models/user')(sequelize, DataTypes)
db.marks = require('../models/mark')(sequelize, DataTypes)
db.assesses = require('../models/assess')(sequelize, DataTypes)



db.orders = require('../models/order')(sequelize, DataTypes)
db.order_details = require('../models/order_detail')(sequelize, DataTypes)



db.cities = require('../models/city')(sequelize, DataTypes);
db.districts = require('../models/district')(sequelize, DataTypes)
db.wards = require('../models/ward')(sequelize, DataTypes)
db.addresses = require('../models/address')(sequelize, DataTypes)


//db.products.sync({alter: true})

//sequelize.sync({alter: true})

db.orders.hasMany(db.order_details)



module.exports = db;