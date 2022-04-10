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

async function getProduct (id) {
    if(id){
        const response = await axios({
            method: 'GET',
            url: `${getUrl()}/api/product/${id}`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,   
            },
        });
        if(response.data.message){
            return null;
        } else return response.data;
    } else return null;
};

async function getAllProducts () {
    const response = await axios({
        method: 'GET',
        url: `${getUrl()}/api/product`,
        headers: {
            authorization: `Bearer ${await getSessionToken()}`,   
        },    
    });
    if(response.data.message){
        return null;
    } else return response.data;
};

async function checkExistance (id) {
    if(id){
        const product = await getProduct(id);
        if(product){
            return true;
        } else return false;
    } else return null;
};

async function updateStockAndPrices (details) {
    // [ {quantity: '123', unitPrice: '123', price: '123', wholesalerPrice: '123'} ];
    if(details){
        const response = await axios({
            method: 'PATCH',
            url: `${getUrl()}/api/product/buy/new`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,   
            },  
            data: {
                details,
            },
        });
        if(response.data.message){
            return null;
        } else return response.data;
    } else return null;
};

async function addProduct ({
            id,
            description,
            buyPrice,
            wholesalerPrice,
            unitPrice,
            stock,
            stockMin,
            idStore,
            idExposition,
            department,
            unitMeasure,
}) {
    if(id,
        description,
        buyPrice,
        wholesalerPrice,
        unitPrice,
        stock,
        stockMin,
        idStore,
        idExposition,
        department,
        unitMeasure){
            const quantity = parseFloat(stock);
            const quantityMin = parseFloat(stockMin);
            const response = await axios({
                method: 'POST',
                url: `${getUrl()}/api/product`,
                headers: {
                    authorization: `Bearer ${await getSessionToken()}`,   
                }, 
                data: {
                    id,
                    description,
                    buyPrice,
                    wholesalerPrice,
                    unitPrice,
                    stock: quantity,
                    stockMin: quantityMin,
                    idStore,
                    idExposition,
                    idDepartment: department,
                    idUnitMeasure: unitMeasure,
                    onSale: 0,
                }
            });
            if(response.data.message) return null
            else return response.data;
        };
};

async function deleteProduct (id) {
    if(id){
        const response = await axios({
            method: 'DELETE',
            url: `${getUrl()}/api/product/${id}`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,   
            },       
        });
        if(response.data.message){
            return null;
        } else return response.data;
    } else return null;
};

async function updateStockFromSell (id, minusStock) {
    if(id && minusStock){
        const response = await axios({
            method: 'PUT',
            url: `${getUrl()}/api/product/sell/${id}?minus=${minusStock}`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,   
            },
        });
        if(response.data.message) return null
        else return response.data;
    } else return null;
};

async function editProduct ({
    id,
    description,
    buyPrice,
    wholesalerPrice,
    unitPrice,
    stock,
    stockMin,
    departmentId,
    locationShowId,
    locationStoreId,
    unitMeasureId,
}) {
    if(id && description && buyPrice && wholesalerPrice && unitPrice && stock && stockMin && departmentId && locationShowId && locationStoreId && unitMeasureId) {
        const response = await axios({
            method: 'PATCH',
            url: `${getUrl()}/api/product/${id}`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,   
            },
            data: {
                description,
                buyPrice,
                wholesalerPrice,
                unitPrice,
                stock,
                stockMin,
                idDepartment: departmentId,
                idStore: locationStoreId,
                idExposition: locationShowId,
                idUnitMeasure: unitMeasureId,
                onSale: 0,
            },
        });
        if(response.data.message) return null
        else return response.data;
    };
};

async function changeSaleStatus (id) {
    if(id){
        const response = await axios({
            method: 'PUT',
            url: `${getUrl()}/api/product/sale/${id}`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,   
            },         
        });
        if(response.data.message) return null
        else return response.data;
    } else return null;
};

async function getProductsMissing () {
    const products = await getAllProducts();
    const missing = products.map(product => {
        if(parseFloat(product.stock) < parseFloat(product.stockMin)){
            return product;
        };
    });
    return missing;
};

module.exports = {
    getProduct,
    getAllProducts,
    getProductsMissing,
    updateStockAndPrices,
    updateStockFromSell,
    addProduct,
    checkExistance,
    deleteProduct,
    editProduct,
    changeSaleStatus,
    getProductsMissing,
};