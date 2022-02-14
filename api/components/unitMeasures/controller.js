const store = require('./store');

const getOne = async (id) => {
    return await store.getOne(id);
};

const getAll = async () => {
    return await store.getAll();
};

const create = async (data) => {
    return await store.create(data);
};

const update = async (id, data) => {
    return await store.update(id, data);
};

const remove = async (id) => {
    return await store.remove(id);
};

module.exports = {
    getOne,
    getAll,
    create,
    update,
    remove,
};