const storeProducts = require('../products/store');

const config = require('../../config/config.js');
const axios = require('axios');
const { getSessionToken } = require('../../config/auth');
const dates = require('../../config/date');

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

async function addSale ({
    idProduct,
    fromDate,
    toDate,
    discount,
}) {
    let productChange = 1;
    const iterable = await getAllSales();

    for (const sale of iterable) {
        if(sale.idProduct == idProduct){
            await deleteSale(sale.id);
            productChange = 0;
        };
    };
        

    if(idProduct && fromDate && toDate && discount){
        const response = await axios({
            method: 'POST',
            url: `${getUrl()}/api/sale`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,
            },
            data: {
                idProduct,
                fromDate,
                toDate,
                discount,
                productChange,
            },
        });
        if(response.data.message) return null
        else return response.data;
    } else return null;
};

async function getSaleByProduct (idProduct) {
    const allSales = await getAllSales();
    const date = dates.actualDate();
    const actualYear = date.slice(0,4);
    const actualMonth = date.slice(5,7);
    const actualDay = date.slice(8,10);
    
    for (const sale of allSales) {
        if(sale.idProduct == idProduct){
            const fromYear = sale.fromDate.slice(0,4);
            const fromMonth = sale.fromDate.slice(5,7);
            const fromDay = sale.fromDate.slice(8,10);
            const toYear = sale.toDate.slice(0,4);
            const toMonth = sale.toDate.slice(5,7);
            const toDay = sale.toDate.slice(8,10);
            if(actualYear >= fromYear && actualYear <= toYear){
                if(actualMonth >= fromMonth && actualMonth <= toMonth){
                    if(actualDay >= fromDay && actualDay <= toDay){
                        return parseFloat(sale.discount);
                    } await deleteSale(sale.id);
                } await deleteSale(sale.id);
            } else await deleteSale(sale.id);
        };
    };

    return 0;
};

async function getSale (id) {
    const response = await axios({
        method: 'GET',
        url: `${getUrl()}/api/sale/${id}`,
        headers: {
            authorization: `Bearer ${await getSessionToken()}`,
        },
    });
    if(response.data == undefined) return 1
    else if (response.data.message) return null
    else return response.data;
};

async function deleteSale (id) {
    const sale = await getSale(id);
    if(id && sale) {
        await storeProducts.changeSaleStatus(sale.idProduct);
        const response = await axios({
            method: 'DELETE',
            url: `${getUrl()}/api/sale/${id}`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,
            },
        });
        if(response.data == undefined) return 1
        else if (response.data.message) return null
        else return response.data;
    } else return null;
};

async function getAllSales () {
    const response = await axios({
        method: 'GET',
        url: `${getUrl()}/api/sale`,
        headers: {
            authorization: `Bearer ${await getSessionToken()}`,
        },
    });
    if(response.data.message) return null
    else return response.data;
};

async function getAllSalesWithProducts () {
    const response = await axios({
        method: 'GET',
        url: `${getUrl()}/api/sale`,
        headers: {
            authorization: `Bearer ${await getSessionToken()}`,
        },
    });
    if(response.data.message) return null
    else return response.data;
};

module.exports = { 
    addSale,
    getSaleByProduct,
    getAllSales,
    getAllSalesWithProducts,
    deleteSale,
};