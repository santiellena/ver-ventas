const products = {
    1: {
        id: 1,
        description: 'Mayonesa 200ml',
        stock: 22,
        unitPrice: 120,
        wholesalerPrice: 100,
        buyPrice: 75,
        location: ['Estante 1', 'Pasillo 1'],
        department: 'Varios',
        unitMeasure: 'Unidad',
    },
    2: {
        id: 2,
        description: 'Ketchup 300ml',
        stock: 12,
        unitPrice: 320,
        wholesalerPrice: 270,
        buyPrice: 180,
        location: ['Estante 1', 'Pasillo 2'],
        department: 'Varios',
        unitMeasure: 'Unidad',
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
            if(products[id] == undefined){
                return products[id] = {
                    id,
                    description,
                    unitPrice,
                    wholesalerPrice,
                    location,
                    department,
                    unitMeasure,
                    stock,
                    buyPrice,
                };
            }
        }
};

module.exports = {
    getProduct,
    getAllProducts,
    updateStockAndPrices,
    addProduct,
    checkExistance,
};