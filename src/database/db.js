const { Sequelize, DataTypes } = require('sequelize');
const { DATABASE } = require('../config/mysql')

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




sequelize.models.brands = require('../models/brand')(sequelize, DataTypes)

sequelize.models.categories = require('../models/category')(sequelize, DataTypes)
sequelize.models.products = require('../models/product')(sequelize, DataTypes)
sequelize.models.properties = require('../models/property')(sequelize, DataTypes)
sequelize.models.property_values = require('../models/property_value')(sequelize, DataTypes)
sequelize.models.product_details = require('../models/product_detail')(sequelize, DataTypes)
sequelize.models.show_rooms = require('../models/show_room')(sequelize, DataTypes)
sequelize.models.stored_products = require('../models/stored_product')(sequelize, DataTypes)
sequelize.models.banners = require('../models/banner')(sequelize, DataTypes)


sequelize.models.users = require('../models/user')(sequelize, DataTypes)
sequelize.models.marks = require('../models/mark')(sequelize, DataTypes)
sequelize.models.assesses = require('../models/assess')(sequelize, DataTypes)



sequelize.models.orders = require('../models/order')(sequelize, DataTypes)
sequelize.models.order_details = require('../models/order_detail')(sequelize, DataTypes)



sequelize.models.cities = require('../models/city')(sequelize, DataTypes);
sequelize.models.districts = require('../models/district')(sequelize, DataTypes)
sequelize.models.wards = require('../models/ward')(sequelize, DataTypes)
sequelize.models.addresses = require('../models/address')(sequelize, DataTypes)


sequelize.models.orders.hasMany(sequelize.models.order_details)
sequelize.models.products.hasMany(sequelize.models.product_details)

sequelize.sync({alter: true})

module.exports = sequelize;