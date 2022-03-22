const dates = require('../../config/date');
const config = require('../../config/config');
const axios = require('axios');
const { getUrl }= config;
const { getSessionToken } = require('../../config/auth');

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
        const substract = await getCashRegister(idBox).moneyAmount - amountFloat;
        const updatedAmount = substract.toFixed(2);
        const response = await axios({
            method: 'PATCH',
            url: `${getUrl()}/api/cash-register/${idBox}`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,
            },
            data: {
                moneyAmount: updatedAmount,
            },
        });
        if(response.data.message) return null
        else return response.data;
    } else return null;
    
};  

function addToBox (idBox, idBranch, amount) {
    if(idBranch == config.getBranchDataFromConfig().id){
        const amountFloat = parseFloat(amount);
        const sum = await getCashRegister(idBox).moneyAmount + amountFloat;
        const updatedAmount = sum.toFixed(2);
        const response = await axios({
            method: 'PATCH',
            url: `${getUrl()}/api/cash-register/${idBox}`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,
            },
            data: {
                moneyAmount: updatedAmount,
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