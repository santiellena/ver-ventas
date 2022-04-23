const cron = require('node-cron');
const config = require('../config.schedule.js');
const date = require('../utils/date');
const mysqldump = require('mysqldump');

const dump = async () => {
    mysqldump({
        connection: {
            host: config.dbHost,
            user: config.dbUser,
            password: config.dbPassword,
            database: config.dbName,
        },
        dumpToFile: `../database/dumps/dump-${date()}.sql`,
        compressFile: false,
    });
    return 1;
};

cron.schedule('59 23 * * *', async function() {
    console.log('---------------------');
    console.log('Running Cron Job');
    const result = await dump();
    if(result){
        console.log('Succeed cron job');
    } else {
        console.log('Error running cron job');
    };
});

cron.schedule('59 7 * * *', async function() {
    console.log('---------------------');
    console.log('Running Cron Job');
    const result = await dump();
    if(result){
        console.log('Succeed cron job');
    } else {
        console.log('Error running cron job');
    };
});