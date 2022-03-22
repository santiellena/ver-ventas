const dates = require('../../config/date');
const config = require('../../config/config');
const axios = require('axios');
const { getUrl }= config;
const { getSessionToken } = require('../../config/auth');

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

function addRegister ({
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