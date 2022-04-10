const boom = require('@hapi/boom');
const { People } = require('../../database/database').sequelize.models;
const { Supplier } = require('../../database/database').sequelize.models;
const { DocType } = require('../../database/database').sequelize.models;

const getAll = async () => {
    return await Supplier.findAll({include: ['person']});
};

const getOne = async (id) => {
    const supplier = await Supplier.findByPk(id, { include: ['person']});
    if(!supplier){
        throw boom.badRequest();
    } else {
        return supplier;
    };
};

const create = async (data) => {
    return await Supplier.create(data);
};

const update = async (id, data) => {
    const supplier = await getOne(id);
    return await supplier.update(data);
};

const remove = async (id) => {
    const supplier = await getOne(id);
    return await supplier.destroy();
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
};