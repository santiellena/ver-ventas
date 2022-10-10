const store = require('./store');
const boom = require('@hapi/boom');

const getAll = async () => {
    return await store.getAll();
};

const getOne = async (id) => {
    return await store.getOne(id);
};

const getMissing = async () => {
    const allProducts = store.getAll();
    const missing = [];
    for (const product of allProducts) {
        console.log(product);
        if(product.stock < product.stockMin){
            missing.push(product);
        };  
    };

    if(missing.length == 0){
        throw boom.notFound();
    } else {
        return missing;
    };
};

const create = async (data) => {
    return await store.create(data);
};

const update = async (id, changes) => {
    return await store.update(id, changes);
};

const updateByDetail = async (details) => {
    for (const detail of details) {
        const { product, unitPrice, price, wholesalerPrice, quantity } = detail;
        const oldProduct = await store.getOne(product);
        const newQuantity = parseFloat(quantity) + parseFloat(oldProduct.stock);
        await store.update(product, {
            buyPrice: price,
            unitPrice,
            wholesalerPrice,
            stock: parseFloat(newQuantity),
        });
    };  
    return true;
};

const remove = async (id) => {
    return await store.remove(id);
};

const updateOnSale = async (id) => {
    const product = await store.getOne(id);
    if(product.onSale == 0){
        return await store.update(id, {onSale: 1})
    } else return await store.update(id, {onSale: 0});
};

const updateFromSell = async (id, minus) => {
    const product = await store.getOne(id);
    const minusStock = parseFloat(minus);
    const newStock = product.stock - minusStock;
    return await store.update(id, {stock: newStock});
};

const getByDescription = async (description) => {
    let products = await store.getAll();
    let descriptionUpper = description.toUpperCase();
    const matches = []
    for (const product of products) {
        let productUpper = product.description.toUpperCase();
        let match = productUpper.search(descriptionUpper);
        if(match == 0){
            matches.push(product);
        };
    }
    return matches;
};

module.exports = {
    getAll,
    getOne,
    getMissing,
    create,
    update,
    updateOnSale,
    updateFromSell,
    updateByDetail,
    remove,
    getByDescription,
};
