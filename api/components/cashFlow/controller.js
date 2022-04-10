const store = require('./store');
const config = require('../../config');

const getAll = async (idBranch) => {
    return await store.getAll(idBranch);
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

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
};
