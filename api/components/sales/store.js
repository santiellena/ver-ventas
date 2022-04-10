const { Sale } = require('../../database/database').sequelize.models;
const boom = require('@hapi/boom');

const getAll = async () => {
    return await Sale.findAll({include: ['product']});
};

const getOne = async (id) => {
    const sale = await Sale.findByPk(id, {include: ['product']});
    if(!sale){
        throw boom.notFound();
    } else {
        return sale;
    };
};

const create = async (data) => {
    const sale = await Sale.create(data);
    return sale;
};

const update = async (id, changes) => {
    const saleOne = await getOne(id);
    return await saleOne.update(changes);
};

const remove = async (id) => {
    const sale = await getOne(id);
    return await sale.destroy();
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
};