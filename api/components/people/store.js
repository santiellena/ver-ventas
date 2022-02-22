const boom = require('@hapi/boom');
const { People } = require('../../database/database').sequelize.models;

const getAll = async () => {
    return await People.findAll({include: ['docType']});
};

const getOne = async (id) => {
    const people = await People.findByPk(id, { include: ['docType']});
    if(!people){
        throw boom.badRequest();
    } else {
        return people;
    };
};

const create = async (data) => {
    return await People.create(data);
};

const update = async (id, data) => {
    const people = await getOne(id);
    return await people.update(data);
};

const remove = async (id) => {
    const people = await getOne(id);
    return await people.destroy();
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
};