const { Sell, User, Emplooy, People, Customer } = require('../../database/database').sequelize.models;
const boom = require('@hapi/boom');

const getAll = async () => {
    return await Sell.findAll({include: [{
        as: 'customer', model: Customer, include: [{as: 'person', model: People}]
    }, 
    {as: 'user', model: User, include: [{ as: 'emplooy', model: Emplooy}]},
        'branch', 'detail']});
};

const getOne = async (id) => {
    const sale = await Sell.findByPk(id, {include: [{
        as: 'customer', model: Customer, include: [{as: 'person', model: People}]
    }, 
    {as: 'user', model: User, include: [{ as: 'emplooy', model: Emplooy}]},
        'branch', 'detail']});
    if(!sale){
        throw boom.notFound();
    } else {
        return sale;
    };
};

const create = async (data) => {
    const sale = await Sell.create(data);
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