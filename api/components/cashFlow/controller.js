const store = require('./store');
const config = require('../../config');

const getAll = async (idBranch) => {
    return await store.getAll(idBranch);
};

const getLast10 = async (idBranch, offset) => {
    return await store.getLast10(idBranch, offset);
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
    getLast10,
    getOne,
    create,
    update,
    remove,
};
