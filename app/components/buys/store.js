const {  actualDateAccuracy } = require('../../config/date');

const storeProducts = require('../products/store');

const config = require('../../config/config');
const axios = require('axios');
const { getUrl }= config;
const { getSessionToken } = require('../../config/auth');

async function getAllBuys(){
    const response = await axios({
        method: 'GET',
        url: `${getUrl()}/api/buy`,
        Headers: `Bearer ${await getSessionToken()}`,
    });
    if(response.data.message){
        return null;
    } else {
        return response.data;
    };
};

async function getBuy(id){
    if(id != undefined && id != null){
        const response = await axios({
            method: 'GET',
            url: `${getUrl()}/api/buy/${id}`,
            Headers: `Bearer ${await getSessionToken()}`,
        });
        if(response.data.message){
            return null;
        } else return response.data;
    } else return null;
};

async function getBuysByDate(from, to){
    if(from && to){
        const response = await axios({
            method: 'GET',
            url: `${getUrl()}/api/buy/date?from=${from}&to=${to}`  ,
            Headers: `Bearer ${await getSessionToken()}`,
        });
        if(response.data.message){
            return null;
        } else return response.data;
    } else return null;
};

async function getBuyDetail(id) {
    if(id != undefined && id != null){
        const buy = await getBuy(id);
        if(buy){
            return buy.details;
        } else return null;
    } else return null;
};

async function addBuy({
    emplooy,
    branch,
    supplier,
    howPaid,
    details,
}){
    if(emplooy  && branch && supplier && howPaid && details){
        let amount = 0;
        for (const detail of details) {
            const quantityNumber = parseFloat(detail.quantity);
            const priceNumber = parseFloat(detail.price);
            const product = await storeProducts.getProduct(detail.product);
            detail.product = product.description;
            amount =  amount + quantityNumber * priceNumber;
        };

        const response = await axios({
            method: 'POST',
            url: `${getUrl()}/api/buy`,
            Headers: `Bearer ${await getSessionToken()}`,
            data: {
                idEmplooy: emplooy.id,
                idBranch: branch.id,
                idSupplier: supplier.id,
                howPaid,
                details,
                date: actualDateAccuracy(),
            },
        });
        if(response.data.message){
            return null;
        } else return response.data;
        
    } else return null;
};

async function deleteBuy(id){
    if(id != undefined && id != null){
        const response = await axios({
            method: 'DELETE',
            url: `${getUrl()}/api/buy/id`,
            Headers: `Bearer ${await getSessionToken()}`,
        });
        if(response.data.message){
            return null;
        } else return response.data;
    };
};

module.exports = {
    getBuy,
    getAllBuys,
    getBuysByDate,
    getBuyDetail,
    addBuy,
    deleteBuy,
}

// Algoritmo de busqueda por fecha
// const allBuys = getAllBuys();
//     const buysIterable = Object.values(allBuys);
//     const fromYear = from.slice(0,4);
//     const fromMonth = from.slice(5,7);
//     const fromDay = from.slice(8,10);
//     const toYear = to.slice(0,4);
//     const toMonth = to.slice(5,7);
//     const toDay = to.slice(8,10);

//     const buysByDate = [];

//     buysIterable.map(e => {
//         const buyYear = e.date.slice(0,4);
//         const buyMonth = e.date.slice(5,7);
//         const buyDay = e.date.slice(8,10);

//         if(buyYear >= fromYear && buyYear <= toYear){
//             if(buyMonth >= fromMonth && buyMonth <= toMonth){
//                 if(buyDay >= fromDay && buyDay <= toDay){
//                     buysByDate.push(getBuy(e.id));
//                 }
//             }
//         } 
//     });

//     return buysByDate;