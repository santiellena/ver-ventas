const store = require('./store');
const boom = require('@hapi/boom');

const getAll = async () => {
    return await store.getAll();
};

const getOne = async (id) => {
    return await store.getOne(id);
};

const create = async (data) => {
    return await store.create(data);
};

const update = async (id, changes) => {
    return await store.update(id, changes);
};

const remove = async (id) => {
    return await store.remove(id);
};

const updateOnSale = async (id) => {
    const product = store.getOne(id);
    if(product.onSale == 0)return await store.update(id, {onSale: 1})
    else return await store.update(id, {onSale: 0});
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
    updateOnSale,
};
