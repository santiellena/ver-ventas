const store = require('./store');
const boom = require('@hapi/boom');

const getAll = async (idBranch) => {
    return await store.getAll(idBranch);
};

const getOne = async (id) => {
    return await store.getOne(id);
};

const create = async (data) => {
    if(data){
        return await store.create(data);
    };
};

const update = async (id, changes) => {
    return await store.update(id, changes);
};

const remove = async (id) => {
    return await store.remove(id);
};

const getCashFlow = async (id) => {
    return await store.getCashFlow(id);
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
    getCashFlow,
};