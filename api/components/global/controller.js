const store = require('./store');
const boom = require('@hapi/boom');
const config = require('../../config');
const storeBranches = require('../branches/store');

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

const getFirstTimeInfo = async () => {    
    const global = await getOne(1);
    const branches = await storeBranches.getAll();
    return { global, branches };
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
    getFirstTimeInfo,
};
