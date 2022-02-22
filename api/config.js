require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    mode: process.env.MODE,
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    publicToken: process.env.PUBLIC_TOKEN,
}