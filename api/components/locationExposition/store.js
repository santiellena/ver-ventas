const { LocationExposition } = require('../../database/database').sequelize.models;
const boom = require('@hapi/boom');

const getAll = async () => {
    return await LocationExposition.findAll();
};

const getOne = async (id) => {
    const locationExposition = await LocationExposition.findByPk(id);
    if(!locationExposition){
        throw boom.notFound();
    } else {
        return locationExposition;
    };
};

const create = async (data) => {
    const locationExposition = await LocationExposition.create(data);
    return locationExposition;
};

const update = async (id, changes) => {
    const locationExpositionOne = await getOne(id);
    return await locationExpositionOne.update(changes);
};

const remove = async (id) => {
    const locationExposition = await getOne(id);
    return await locationExposition.destroy();
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
};