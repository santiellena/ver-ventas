const config = require('../config');
const { Sequelize } = require('sequelize');
const setupModels = require('./setupModels');

const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
    host: config.dbHost,
    dialect: 'mysql',
    logging: false,
});

setupModels(sequelize);

sequelize.sync(); //DELETE LINE FOR PRODUCTION

function connect () {
    sequelize.authenticate()
    .then(e => console.log('EVENT MYSQL DB Connection working...'))
    .catch(err => console.log(err));
};

module.exports = { 
    sequelize,
    connect,
};

// const connection = mysql.createPool({
//     host: config.dbHost,
//     port: config.dbPort,
//     user: config.dbUser,
//     password: config.dbPassword,
//     database: config.dbName,
// })
// .then(e => {
//     console.log(`EVENT MYSQL DB Connection working...`);
//     return e;
// })
// .catch(err => {
//     console.log('An error has ocurred with MYSQL DB Conection');
//     console.log(err);
// });