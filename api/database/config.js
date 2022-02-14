const config = require('../config');

module.exports = {
    development: {
        username: config.dbUser,
        database: config.dbName,
        host: config.dbHost,
        port: config.dbPort,
        password: config.dbPassword,
        dialect: 'mysql',
        dialectOptions: {
            charset: "utf8mb4",
        },
    },
    production: {
        username: config.dbUser,
        database: config.dbName,
        host: config.dbHost,
        port: config.dbPort,
        password: config.dbPassword,
        dialect: 'mysql',
        dialectOptions: {
            charset: "utf8mb4",
        },
    },
};