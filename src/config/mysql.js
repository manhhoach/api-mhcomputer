require('dotenv').config();
module.exports = {
    DATABASE: {
        DB_DBNAME: process.env.DB_DBNAME || 'mhcomputer',
        DB_USERNAME: process.env.DB_USERNAME || 'root',
        DB_PASSWORD: process.env.DB_PASSWORD || '123456',
        DB_HOST: process.env.DB_HOST || 'localhost',
        DB_DIALECT: 'mysql',
        DB_PORT: process.env.DB_PORT || '3306',
    }
}