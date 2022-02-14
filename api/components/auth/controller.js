const auth = require('../../auth/index');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const store = require('./store');

const login = (username, password, token) => {
    return new Promise( async (resolve, reject) => {
        if(!username && !password && !token){
            return reject(boom.badRequest('No data'));
        };

        resolve(await store.getOneByUsername(username));
    });
};

const getAll = async () => {
    return await store.getAll();
};

const getOne = async (id) => {
    return await store.getOne(id);
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
    login,
    getAll,
    getOne,
    create,
    update,
    remove,
};