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

async function getAllOrders() {
    const response = await axios({
        method: 'GET',
        url: `${getUrl()}/api/order`,
        headers: {
            authorization: `Bearer ${await getSessionToken()}`,
        },
    });
    if(response.data.message) return null
    else return response.data;
};

async function getOrder(id){
    if(id) { 
        const response = await axios({
            method: 'GET',
            url: `${getUrl()}/api/order/${id}`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,
            },
        });
        if(response.data.message) return null
        else return response.data;
    } else return null;
};

async function getOrderDetails(idOrder) {
    if(idOrder != null && idOrder != undefined) {
        const order = await getOrder(idOrder);
        if(order){
            return order.details;
        } else return null;
    } else return null;
};

async function getOrdersByDate(from, to){ // yyyy-mm-dd
    const allOrders = await getAllOrders();
    const fromYear = from.slice(0,4);
    const fromMonth = from.slice(5,7);
    const fromDay = from.slice(8,10);
    const toYear = to.slice(0,4);
    const toMonth = to.slice(5,7);
    const toDay = to.slice(8,10);

    const ordersByDate = allOrders.map(async e => {
        const orderYear = e.date.slice(0,4);
        const orderMonth = e.date.slice(5,7);
        const orderDay = e.date.slice(8,10);

        if(orderYear >= fromYear && orderYear <= toYear){
            if(orderMonth >= fromMonth && orderMonth <= toMonth){
                if(orderDay >= fromDay && orderDay <= toDay){
                    return await getOrder(e.id);
                };
            };
        };
    });
    if(ordersByDate.length == 0) return []
    else return ordersByDate;
};

async function addOrder ({
    amount,
    branch,
    customer,
    priceList,
    details,
    emplooy,
}) {
    if(amount && branch && customer && priceList && details){
        const date = dates.actualDateAccuracy();

        const detailsForOrder = details.map(detail => {
            const id = parseInt(detail[0]);
            const quantity = parseInt(detail[1]);

            const newDetail = {
                idProduct: id,
                quantity,
            };

            return newDetail;
        });

        const response = await axios({
            method: 'POST',
            url: `${getUrl()}/api/order`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,
            },
            data: {
                date,
                amount,
                idBranch: branch.id,
                idCustomer: customer.id,
                priceList,
                idEmplooy: emplooy.id,
                details: detailsForOrder,
            },
        });
        if(response.data.message) return null
        else return response.data;
    } else return null;
};

async function deleteOrder (id) {
    if(id){
        const response = await axios({
            method: 'DELETE',
            url: `${getUrl()}/api/order/${id}`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,
            },
        });
        if(response.data.message) return null
        else return response.data;
    } else return null;
}

module.exports = {
    getAllOrders,
    getOrder,
    getOrderDetails,
    getOrdersByDate,
    addOrder,
    deleteOrder,
};