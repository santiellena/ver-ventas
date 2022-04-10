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

async function getCashRegister(id){
    const response = await axios({
        method: 'GET',
        url: `${getUrl()}/api/cash-register/${id}`,
        headers: {
            authorization: `Bearer ${await getSessionToken()}`,
        },
    });
    if(response.data.message) return null
    else return response.data;
};

async function newBox () {
    const response = await axios({
        method: 'POST',
        url: `${getUrl()}/api/cash-register`,
        headers: {
            authorization: `Bearer ${await getSessionToken()}`,
        },
        data: {
            idBranch: config.getBranchDataFromConfig().id,            
        },
    });
    if(response.data.message) return null
    else return response.data;
};

async function substractToBox (idBox, idBranch, amount) {
    if(idBranch == config.getBranchDataFromConfig().id){
        const amountFloat = parseFloat(amount);
        const box = await getCashRegister(idBox);
        const substract = parseFloat(box.moneyAmount) - amountFloat;
        const response = await axios({
            method: 'PATCH',
            url: `${getUrl()}/api/cash-register/${idBox}`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,
            },
            data: {
                moneyAmount: parseFloat(substract),
            },
        });
        if(response.data.message) return null
        else return response.data;
    } else return null;
    
};  

async function addToBox (idBox, idBranch, amount) {
    if(idBranch == config.getBranchDataFromConfig().id){
        const amountFloat = parseFloat(amount);
        const box = await getCashRegister(idBox);
        const sum = parseFloat(box.moneyAmount) + amountFloat;
        const response = await axios({
            method: 'PATCH',
            url: `${getUrl()}/api/cash-register/${idBox}`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,
            },
            data: {
                moneyAmount: parseFloat(sum),
            },
        });
        if(response.data.message) return null
        else return response.data;
    } else return null;
};

async function returnBoxInfo (id) {
    return await getCashRegister(id);
};

module.exports = {
    newBox,
    addToBox,
    substractToBox,
    returnBoxInfo,
};