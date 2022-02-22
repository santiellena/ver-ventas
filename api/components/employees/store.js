const boom = require('@hapi/boom');
const { Emplooy } = require('../../database/database').sequelize.models;

const getAll = async () => {
    return await Emplooy.findAll({include: ['user','docType']});
};

const getOne = async (id) => {
    const emplooy = await Emplooy.findByPk(id, { include: ['user','docType']});
    if(!emplooy){
        throw boom.badRequest();
    } else {
        return emplooy;
    };
};

const create = async (data) => {
    return await Emplooy.create(data);
};

const update = async (id, data) => {
    const emplooy = await getOne(id);
    return await emplooy.update(data);
};

const remove = async (id) => {
    const emplooy = await getOne(id);
    return await emplooy.destroy();
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
};