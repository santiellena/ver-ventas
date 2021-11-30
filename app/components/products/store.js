const products = {
    1: {
        description: 'Mayonesa 200ml',
        stock: 22,
        unitPrice: 120,
    },
    2: {
        description: 'Ketchup 300ml',
        stock: 12,
        unitPrice: 320,
    },
}

function getProduct (code) {
    if(products[code] != null && products[code] != undefined){
        const product = products[code];
        product.id = code;
        return product;
    } else {
        return null;
    }
}

function getAllProducts () {
    return products;
}

module.exports = {
    getProduct,
    getAllProducts,
}