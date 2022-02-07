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

const network = fs.readFileSync(`${__dirname}/network.json`, {encoding: 'utf-8'}, (err, data) => {
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
    //Branchs == [ { id: 1, name: '', dirStreet: ''} ]

    const connection = (url) => {
        if(url == 'http://mercado1990:3000') {
            const obj = {url};
            fs.writeFileSync(`${__dirname}/network.json`, JSON.stringify(obj), (err, data) => {
                if(err)  throw new Error(err, 'Sobreescritura del archivo de configuración de red.');
            });
            return { businessName: 'Mercado 1990', branchs: [{id: 1, name: 'Principal', dirStreet: 'Corrientes 471'}]};
        } else {
            return null;
        };
    };

    return connection(url);
};

function getUrl () {
    const net = JSON.parse(network);
    return net.url;
};

function checkToken (token, idBranch) {
    if(idBranch && token){
    
        const branch = getBranchData(idBranch, token);
        const cashRegister = getNewCashRegisterData(token);

        const config = getConfig();

        if(branch && cashRegister) {
            config.cashRegister = cashRegister;
            config.branch = {
                id: branch.id,
                name: branch.name,
            };
            config.firstTime = false;

            const json = JSON.stringify(config);
            fs.writeFileSync(`${__dirname}/config.json`, json, (err) => {
                if(err) throw new Error(err, 'Sobreescritura del archivo de configuración.');
            });
            return 1;
        } else {
            return null;
        }
    };
};

const validator = (token) => {
    if(token == '123'){
        return true;
    };
};

function getBranchData (idBranch, token) {
    if(idBranch && token){
        if(validator(token)){
            if(idBranch == 1){
                return { id: 1, name: 'Principal'};
            }
        } else {
            return null;
        };
    };
};

function getNewCashRegisterData (token) {
    if(validator(token)){
        return 1;
    } else {
        return null;
    }
};

function getBranchDataFromConfig () {
    const config = getConfig();

    return config.branch;
};

function getCashRegisterId () {
    const config = getConfig();

    return config.cashRegister;
};

function updateBranchName (newName) {
    if(newName){
        const config = getConfig();

        
        config.branch.name = newName;
        const json = JSON.stringify(config);
        
        fs.writeFileSync(`${__dirname}/config.json`, json, (err) => {
               if(err) throw new Error(err, 'Sobreescritura del archivo de configuración.');
        });
    };
}

module.exports = {
    checkInitialConfig,
    checkUrl,
    checkToken,
    getBranchDataFromConfig,
    getCashRegisterId,
    updateBranchName,
    getUrl,
};

