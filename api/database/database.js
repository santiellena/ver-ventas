const mysql = require('promise-mysql');
const config = require('../config');

const connection = mysql.createConnection({
    host: config.dbHost,
    port: config.dbPort,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
})
.then(e => {
    console.log(`EVENT MYSQL DB Connection working...`)
    
})
.catch(err => {
    console.log('An error has ocurred with MYSQL DB Conection');
    console.log(err);
});

function getConnection () {

    return connection;
}

module.exports = getConnection;