const cron = require('node-cron');
const config = require('../config.schedule.js');
const { actualDateAccuracy, actualDate, actualDatePath } = require('../utils/date');
const mysqldump = require('mysqldump');
const { generateReport } = require('./reports/reports');

const dump = async () => {
    mysqldump({
        connection: {
            host: config.dbHost,
            user: config.dbUser,
            password: config.dbPassword,
            database: config.dbName,
        },
        dumpToFile: `./database/dumps/dump-${actualDateAccuracy()}.sql`,
        compressFile: false,
    });
    return 1;
};

function schedule () {
    cron.schedule('59 21 * * *', async function() {
        console.log('---------------------');
        console.log('Running Cron Job');
        const result = await dump();
        if(result){
            console.log('Succeed cron job');
        } else {
            console.log('Error running cron job');
        };
        await generateReport(actualDate(), actualDatePath());
    });
    
    cron.schedule('59 13 * * *', async function() {
        console.log('---------------------');
        console.log('Running Cron Job');
        const result = await dump();
        if(result){
            console.log('Succeed cron job');
        } else {
            console.log('Error running cron job');
        };
    });
};

module.exports = schedule;
