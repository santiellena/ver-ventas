const dates = require('../../config/date');
const config = require('../../config/config');
const axios = require('axios');
const { getSessionToken } = require('../../config/auth');
const fs = require('fs');

const network = fs.readFileSync(`${__dirname}/../../config/network.json`, {encoding: 'utf-8'}, (err, data) => {
    if(err) {
        throw new Error(err);
    } else {
        return JSON.parse(data);
    };
});

function getUrl () {
    const net = JSON.parse(network);
    return net.url;
};

async function getAllRegisters () {
    const response = await axios({
        method: 'GET',
        url: `${getUrl()}/api/cash-flow`,
        data: {
            idBranch: config.getBranchDataFromConfig().id,
        },
        headers: {
            authorization: `Bearer ${await getSessionToken()}`,
        },
    });
    if(response.data.message) return null
    else return response.data;
};

async function addRegister ({
    emplooy,
    amount,
    operation,
    observation,
    box,
}) {
    if(emplooy && amount && operation && box && observation) {
        const response = await axios({
            method: 'GET',
            url: `${getUrl()}/api/cash-flow`,
            data: {
                date: dates.actualDateAccuracy,
                emplooy,
                amount,
                operation,
                observation,
                idCashRegister: config.getCashRegisterId(),
            },
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,
            },
        });
        if(response.data.message) return null
        else return response.data;
    };
};

module.exports = {
    getAllRegisters,
    addRegister,
};