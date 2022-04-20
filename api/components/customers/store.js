const boom = require('@hapi/boom');
const { Customer, Sell, User, Emplooy } = require('../../database/database').sequelize.models;

const getAll = async () => {
    return await Customer.findAll({include: ['person']});
};

const getOne = async (id) => {
    const customer = await Customer.findByPk(id, { include: ['person']});
    if(!customer){
        throw boom.badRequest();
    } else {
        return customer;
    };
};

const getOneWithSells = async (id) => {
    const customer = await Customer.findByPk(id, { include: ['person', {
        as: 'sells',
        model: Sell,
        include: [{
           as: 'user',
           model: User,
           include: [{ as: 'emplooy', model: Emplooy}], 
        }],
    }]});
    if(!customer){
        throw boom.badRequest();
    } else {
        return customer;
    };
};

const create = async (data) => {
    return await Customer.create(data);
};

const update = async (id, data) => {
    const customer = await getOne(id);
    return await customer.update(data);
};

const remove = async (id) => {
    const customer = await getOne(id);
    return await customer.destroy();
};

module.exports = {
    getAll,
    getOne,
    getOneWithSells,
    create,
    update,
    remove,
};