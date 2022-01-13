const fs = require('fs');
const { 
    createMainWindow,
    createFirstTimeWindow,
    createLoginWindow,
} = require('../createWindows');

const configs = fs.readFileSync(`${__dirname}/config.json`, {encoding: 'utf-8'}, (err, data) => {
    if(err) {
        throw new Error(err);
    } else {
        return JSON.parse(data);
    }
});

function getConfig () {
    const config = JSON.parse(configs);
    
    return config;
};

function checkInitialConfig () {
    const config = getConfig();
    if(config.firstTime){
        createFirstTimeWindow();
    } else {
        createLoginWindow();
    };
};

function checkUrl (url) {
    //Axios connection to check server status. 
    //If connection is successful, Status Code must be 200.
    //Data: { businessName: '', branchs};
    //Branchs == [ { name: '', dirStreet: ''} ]

    const connection = (url) => {
        if(url == 'http://mercado1990:3000') {
            return { businessName: 'Mercado 1990', branch: [{ name: 'Principal', dirStreet: 'Corrientes 471'}] };
        } else {
            return null;
        };
    };

    return connection();
};

module.exports = {
    checkInitialConfig,
    checkUrl,
};

