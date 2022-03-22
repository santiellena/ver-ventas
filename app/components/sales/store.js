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
    const iterable = Object.values(sales);

    for (const sale of iterable) {
        if(sale.idProduct == idProduct){
            deleteSale(sale.id);
            productChange = 0;
        };
    };
        let newId = 0;
        for (let i = 1; i < iterable.length + 1; i++) {
            if(sales[i] == undefined){
                newId = i;
                break;
            } else if(sales[i+1] == undefined){
                newId = i+1;
                break;
            };
        };

        

    if(sales[newId] == undefined && idProduct && fromDate && toDate && discount){

        return sales[newId] = {
            id: newId,
            idProduct,
            fromDate,
            toDate,
            discount,
            productChange,
        };
    };
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
                        
                        return sale;
                    } await deleteSale(sale.id);
                } await deleteSale(sale.id);
            } else await deleteSale(sale.id);
        };
    };

    return 0;
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