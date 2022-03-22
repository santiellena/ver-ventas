const config = require("../../config/config");
const axios = require("axios");
const { getUrl } = config;
const { getSessionToken } = require("../../config/auth");

const dates = require('../../config/date');

const storeProducts = require('../products/store');
const storeDepartments = require('../departments/store');
const storeCustomers = require('../customers/store');

async function getAllSells () {
    const response = await axios({
        method: 'GET',
        url: `${getUrl()}/api/sell`,
        headers: {
            authorization: `Bearer ${await getSessionToken()}`,
        },
    });
    if(response.data.message) return null
    else return response.data;
};

async function getSell (id) {
    if(id){
        const response = await axios({
            method: 'GET',
            url: `${getUrl()}/api/sell/${id}`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,
            },
        });
        if(response.data.message) return null
        else return response.data;
    } else return null;
};

async function getSellDetail (id) {
   const sell = await getSell(id);
   if(sell) return sell.details
   else return null;
};

async function getSellsByDate (from, to) {
    const response = await axios({
        method: 'GET',
        url: `${getUrl()}/api/sell/date?from=${from}&to=${to}`,
        headers: {
            authorization: `Bearer ${await getSessionToken()}`,
        },
    });
    if(response.data.message) return null
    else return response.data;
};

async function addSell ({
    amount,
    branch,
    customer,
    emplooy,
    howPaid,
    details,
    priceList,
    howMuchPaid,
}) {
    if(amount, branch, customer, howPaid, details, priceList, emplooy, howMuchPaid) {
        const detailsForSell = [];

        details.map(detail => {
            const id = parseInt(detail[0]);
            const minusStock = parseInt(detail[1]);
            await storeProducts.updateStockFromSell(id, minusStock);
            const product = await storeProducts.getProduct(id);
            let price = 0;


            if(priceList == 'public') {
                price = product.unitPrice;
            } else {
                price = product.wholesalerPrice
            };
            const newDetail = {
                idProduct: product.id,
                product: product.description,
                quantity: minusStock,
                price,
            };
            detailsForSell.push(newDetail);
        });

        const response = await axios({
            method: 'POST',
            url: `${getUrl()}/api/sell`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,
            },
            data: {
                date: dates.actualDateAccuracy(),
                amount,
                branch,
                customer,
                howPaid,
                details: detailsForSell,
                emplooy,
                howMuchPaid,
            },
        });
        if(response.data.message) return null
        else return response.data;
    };
};

async function deleteSell (id) {
    if(id != undefined && id != null){
        const response = await axios({
            method: 'DELETE ',
            url: `${getUrl()}/api/sell/${id}`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,
            },
        });
        if(response.data.message) return null
        else return response.data;
    };
};

async function getSellsByCustomer (idCustomer) {
    if(idCustomer){
       const customer = await storeCustomers.getCustomer(idCustomer);
        if(customer){
            const sellList = customer.sells.map(e => {
                if(e.howPaid == 'Cuenta Corriente' || e.howPaid == 'Contado/Cuenta Corriente'){
                    return e;
                };
            });
            return sellList;
        } else return null;
    } else return null;
};

async function getGainsByDepartment (from, to) {
    const sells = await getAllSells();
    const fromYear = from.slice(0,4);
    const fromMonth = from.slice(5,7);
    const fromDay = from.slice(8,10);
    const toYear = to.slice(0,4);
    const toMonth = to.slice(5,7);
    const toDay = to.slice(8,10);

    const sellsToday = [];
    for (const sell of sells) {
        const sellYear = sell.date.slice(0,4);
        const sellMonth = sell.date.slice(5,7);
        const sellDay = sell.date.slice(8,10);
     
        if(sellYear >= fromYear && sellYear <= toYear){
            if(sellMonth >= fromMonth && sellMonth <= toMonth){
                if(sellDay >= fromDay && sellDay <= toDay){
                    sellsToday.push(sell);
                };
            };
        }; 
    };
    const departments = await storeDepartments.getAllDepartments();
    let gains = 0;
    for (const sell of sellsToday) {
        for (const detail of sell.details) {
            const product = await storeProducts.getProduct(detail.idProduct);
            const department = await storeDepartments.getDepartment(product.department.id);
            gains += detail.quantity * (detail.price - product.buyPrice);
            if(department){
                if(department.gains == undefined){
                    department.gains = detail.quantity * (detail.price - product.buyPrice);
                } else {
                    department.gains += detail.quantity * (detail.price - product.buyPrice);
                };
            };  
        };
    };
    const arrayDepartments = departments.map(dep => {
        
        dep.percentage = dep.gains / gains * 100;
        return dep;
    });
    

    return {
        gains,
        departments: arrayDepartments,
        amountOfSells: sellsToday.length,
    };
    
};

async function addSellFromOrder (order) {
    
};

module.exports = {
    getAllSells,
    getSell,
    getSellDetail,
    getSellsByDate,
    getSellsByCustomer,
    addSell,
    deleteSell,
    getGainsByDepartment,
    addSellFromOrder,
};