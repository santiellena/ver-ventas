const { Sell, User, Emplooy, People, Customer } = require('../../database/database').sequelize.models;
const boom = require('@hapi/boom');
const { sequelize } = require('../../database/database');

const getAll = async () => {
    return await Sell.findAll({include: [{
        as: 'customer', model: Customer, include: [{as: 'person', model: People}]
    }, 
    {as: 'user', model: User, include: [{ as: 'emplooy', model: Emplooy}]},
        'branch', 'details'],
    order: [
        ['id', 'DESC'],
    ],
    });
};

const getLast10 = async (offset) => {
    return await Sell.findAll({include: [{
        as: 'customer', model: Customer, include: [{as: 'person', model: People}]
    }, 
    {as: 'user', model: User, include: [{ as: 'emplooy', model: Emplooy}]},
        'branch', 'details'],
    limit: 9,
    offset,
    order: [
        ['id', 'DESC'],
    ],
    });
};


const getOne = async (id) => {
    const sale = await Sell.findByPk(id, {include: [{
        as: 'customer', model: Customer, include: [{as: 'person', model: People}]
    }, 
    {as: 'user', model: User, include: [{ as: 'emplooy', model: Emplooy}]},
        'branch', 'details']});
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

const getTodaySells = async (date) => {
    const dateRegex = `${date}-[0-9][0-9]:[0-9][0-9]`;
    const todaySells = await sequelize.query(`SELECT * FROM sell WHERE date REGEXP '${dateRegex}'`);
    return todaySells
};

module.exports = {
    getAll,
    getOne,
    getLast10,
    create,
    update,
    remove,
    getTodaySells,
};