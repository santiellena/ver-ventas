const storeDepartments = require('../departments/store');
const storeLocations = require('../locations/store');
const StoreUnitMeasure = require('../unitMeasures/store');

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
        onSale: 0,
    },
}

function getProduct (code) {
    if(products[code] != null && products[code] != undefined){
        const product = products[code];
        return product;
    } else {
        return null;
    }
};

function getAllProducts () {
    return products

};

function checkExistance (id) {
    if( products[id] == undefined || products[id] == null ){

        return false;
    } else {
        return true;
    }
};

function updateStockAndPrices (details) {
    if(details){
        for (const detail of details) {
            const quantity = parseFloat(detail.quantity);
            const unitPrice = parseFloat(detail.unitPrice);
            const buyPrice = parseFloat(detail.price)
            const wholesalerPrice = parseFloat(detail.wholesalerPrice);

            products[detail.product].stock += quantity;
            products[detail.product].unitPrice = unitPrice;
            products[detail.product].wholesalerPrice = wholesalerPrice;
            products[detail.product].buyPrice = buyPrice;
        };
    }
};

function addProduct ({
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
            if(products[id] == undefined){
                return products[id] = {
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
                };
            }
        }
};

function deleteProduct (id) {
    if(products[id] == undefined){
        return;
    } else {
        delete products[id];
    };
};

function updateStockFormSell (id, minusStock) {
    if(products[id] != undefined) {
        products[id].stock = products[id].stock - minusStock;
    };
};

function editProduct ({
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
        const department = storeDepartments.getDepartment(departmentId).description;
        const locationShow = storeLocations.getLocationShow(locationShowId).description;
        const locationStore = storeLocations.getLocationStore(locationStoreId).description;
        const location = [locationStore, locationShow];
        const unitMeasure = StoreUnitMeasure.getMeasure(unitMeasureId).longDescription;
        
        if(products[id] != undefined){
            return products[id] = {
                id: parseInt(id),
                description,
                buyPrice: parseFloat(buyPrice),
                wholesalerPrice: parseFloat(wholesalerPrice),
                unitPrice: parseFloat(unitPrice),
                stock: parseFloat(stock),
                department,
                location,
                unitMeasure,
                onSale: 0,
            };
        };
    };
};

function changeSaleStatus (id) {
    if(id && products[id] != undefined) {
        products[id].onSale == 0 ? products[id].onSale = 1 : products[id].onSale = 0;
    };
};

module.exports = {
    getProduct,
    getAllProducts,
    updateStockAndPrices,
    updateStockFormSell,
    addProduct,
    checkExistance,
    deleteProduct,
    editProduct,
    changeSaleStatus,
};