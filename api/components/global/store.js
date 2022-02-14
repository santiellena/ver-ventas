const { sequelize } = require('../../database/database');
const { models } = sequelize;
const { Global } = models;
const boom = require('@hapi/boom');

const getAll = async () => {
    return await Global.findAll();
};

const getOne = async (id) => {
    const global = await Global.findByPk(id);
    if(!global){
        throw boom.notFound();
    } else {
        return global;
    };
};

const create = async (data) => {
    const global = await Global.create(data);
    return global;
};

const update = async (id, changes) => {
    const globalOne = await getOne(id);
    return await globalOne.update(changes);
};

const remove = async (id) => {
    const global = await getOne(id);
    return await global.destroy();
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
};