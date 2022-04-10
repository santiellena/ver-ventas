const {  actualDateAccuracy } = require('../../config/date');

const storeProducts = require('../products/store');

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

async function getAllBuys(){
    const response = await axios({
        method: 'GET',
        url: `${getUrl()}/api/buy`,
        headers: {
                authorization: `Bearer ${await getSessionToken()}`,   
            },
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
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,   
            },
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
            url: `${getUrl()}/api/buy/date/when?from=${from}&to=${to}`  ,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,   
            },
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
    user,
    branch,
    supplier,
    howPaid,
    details,
}){
    if(user  && branch && supplier && howPaid && details){
        let totalAmount = 0;
        for (const detail of details) {
            const quantityNumber = parseFloat(detail.quantity);
            const priceNumber = parseFloat(detail.price);
            detail.idProduct = detail.product;
            totalAmount =  totalAmount + quantityNumber * priceNumber;
        };

        const response = await axios({
            method: 'POST',
            url: `${getUrl()}/api/buy`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,   
            },
            data: {
                idUser: user.id,
                idBranch: branch.id,
                idSupplier: supplier,
                howPaid,
                details,
                totalAmount,
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
            url: `${getUrl()}/api/buy/${id}`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,   
            },
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