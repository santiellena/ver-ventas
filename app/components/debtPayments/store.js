const config = require("../../config/config.js");
const axios = require("axios");
const { getUrl } = config;
const { getSessionToken } = require("../../config/auth");
const dates = require("../../config/date");

async function addPay ({
    emplooy,
    customer,
    amount,
    observation,
    howPaid,
}) {
    if(emplooy && customer && amount && observation && howPaid){
        const date = dates.actualDate();

        const response = await axios({
            method: 'POST',
            url: `${getUrl()}/api/debt-payment`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,
            },
            data: {
                idEmplooy: emplooy,
                idCustomer: customer,
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
            url: `${getUrl()}/api/customer/debt-payment/${idCustomer}`,
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