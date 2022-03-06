const fs = require('fs');
const axios = require('axios');
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
    };
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

async function checkUrl (url) {
    //Axios connection to check server status. 
    //If connection is successful, Status Code must be 200.
    //Data: { businessName: '', branchs};
    //Branchs == [ { id: 1, name: '', dirStreet: ''}
    const conn = await axios({
       method: 'GET',
       url: `${url}/api/`, 
    });
    if(conn.data){
        const { global, branches } = conn.data;
        const info = { businessName: global.businessName, branches };
        return info;
    } else {
        return null;
    };
};

function getUrl () {
    const net = JSON.parse(network);
    return net.url;
};

async function checkToken (token, idBranch) {
    if(idBranch && token){
        const response = await axios({
            url: `${getUrl()}/api/token/${token}`,
            method: 'GET',
        });
        if(response.status != 200 && response.status != 201){
            return null;
        };
        const branch = await getBranchData(idBranch);
        const cashRegister = await getNewCashRegisterData(idBranch);

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


async function getBranchData (idBranch) {
    const branch = await axios({
        url: `${getUrl()}/api/branch/${idBranch}`,
        method: 'GET',
    });
    return branch.data;
};

async function getNewCashRegisterData (idBranch) {
    const newCashRegister = await axios({
        method: 'POST',
        url: `${getUrl()}/api/cash-register`,
        data: {
            idBranch,
            moneyAmount: 0,
        },
    });

    return newCashRegister.data.id;
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

function returnToken () {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwic2NvcGVzIjpbIm1lbnUtc3RvY2siLCJtZW51LXNlbGxzIiwibWVudS1idXlzIiwibWVudS1hZG1pbiIsIm1lbnUtcXVlcmllcyIsIm1lbnUtbWFpbnRlbmFuY2UiLCJtZW51LWludm9pY2luZyJdLCJpYXQiOjE2NDU1NDE5Mjh9.HCtdIq6yfp6C3ApCtvEW9kbkIXWm6cfuFGEyn-UrEUA';
};

module.exports = {
    checkInitialConfig,
    checkUrl,
    checkToken,
    getBranchDataFromConfig,
    getCashRegisterId,
    updateBranchName,
    getUrl,
    returnToken,
};

