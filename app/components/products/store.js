const storeDepartments = require('../departments/store');
const storeLocations = require('../locations/store');
const StoreUnitMeasure = require('../unitMeasures/store');

const config = require('../../config/config');
const axios = require('axios');
const { getUrl }= config;
const { getSessionToken } = require('../../config/auth');

const products = {
    1: {
        id: 1,
        description: 'Mayonesa 200ml',
        stock: 22,
        unitPrice: 120,
        wholesalerPrice: 100,
        buyPrice: 75,
        location: ['Estante 1', 'Pasillo 1'],
        department: {id: 2, description:'Carniceria'},
        unitMeasure: 'Unidad',
        stockMin: 10,
        onSale: 1,
    },
    2: {
        id: 2,
        description: 'Ketchup 300ml',
        stock: 12,
        unitPrice: 320,
        wholesalerPrice: 270,
        buyPrice: 180,
        location: ['Estante 1', 'Pasillo 2'],
        department: {id: 1, description:'Varios'},
        unitMeasure: 'Unidad',
        stockMin: 15,
        onSale: 0,
    },
}

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
            url: `${getUrl()}/api/product`,
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
    stock,
    unitPrice,
    wholesalerPrice,
    buyPrice,
    location,
    department,
    unitMeasure,
}) {
    if(id,
        description,
        stock,
        unitPrice,
        wholesalerPrice,
        buyPrice,
        location,
        department,
        unitMeasure){
            const quantity = parseFloat(stock);
            const response = await axios({
                method: 'POST',
                url: `${getUrl()}/api/product`,
                headers: {
                    authorization: `Bearer ${await getSessionToken()}`,   
                }, 
                data: {
                    id,
                    description,
                    unitPrice,
                    wholesalerPrice,
                    location,
                    department,
                    unitMeasure,
                    stock: quantity,
                    buyPrice,
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
    departmentId,
    locationShowId,
    locationStoreId,
    unitMeasureId,
}) {
    if(id && description && buyPrice && wholesalerPrice && unitPrice && stock && departmentId && locationShowId && locationStoreId && unitMeasureId) {
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
            method: 'PATCH',
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
    const response = await axios({
        method: 'GET',
        url: `${getUrl()}/api/product/missing/`,
        headers: {
                authorization: `Bearer ${await getSessionToken()}`,   
            },
    });
    if(response.data.message) return null
    else return response.data;
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