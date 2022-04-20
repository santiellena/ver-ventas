const config = require("../../config/config.js");
const axios = require("axios");
const { getUrl } = config;
const { getSessionToken } = require("../../config/auth");
const dates = require("../../config/date");

async function addPay ({
    idUser,
    idCustomer,
    amount,
    observation,
    howPaid,
}) {
    if(idUser && idCustomer && amount && observation && howPaid){
        const date = dates.actualDate();

        const response = await axios({
            method: 'POST',
            url: `${getUrl()}/api/debt-payment`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,
            },
            data: {
                idUser,
                idCustomer,
                amount,
                observation,  
                howPaid,
                date,  
            },
        });
        if(response.data.message) return null
        else return response.data;
    };
};

async function getPaymentsByCustomer (idCustomer) {
    if(idCustomer){
        const response = await axios({
            method: 'GET',
            url: `${getUrl()}/api/debt-payment/${idCustomer}`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,
            },
        });
        if(response.data.message) return null
        else return response.data;
    };
};

module.exports = {
    addPay,
    getPaymentsByCustomer,
};