const { LocationStore } = require('../../database/database').sequelize.models;
const boom = require('@hapi/boom');

const getAll = async () => {
    return await LocationStore.findAll();
};

const getOne = async (id) => {
    const locationStore = await LocationStore.findByPk(id);
    if(!locationStore){
        throw boom.notFound();
    } else {
        return locationStore;
    };
};

const create = async (data) => {
    const locationStore = await LocationStore.create(data);
    return locationStore;
};

const update = async (id, changes) => {
    const locationStoreOne = await getOne(id);
    return await locationStoreOne.update(changes);
};

const remove = async (id) => {
    const locationStore = await getOne(id);
    return await locationStore.destroy();
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
};