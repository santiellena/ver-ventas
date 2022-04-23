const config = require('../../config');
const date = require('../../utils/date');
const mysqldump = require('mysqldump');

const dump = async () => {
    mysqldump({
        connection: {
            host: config.dbHost,
            user: config.dbUser,
            password: config.dbPassword,
            database: config.dbName,
        },
        dumpToFile: `./database/dumps/dump-${date()}.sql`,
        compressFile: false,
    });
    return 1;
};

module.exports = {
    dump,
};