const boom = require('@hapi/boom');
const { Order, User, Emplooy, Customer, People } = require('../../database/database').sequelize.models;

const getAll = async () => {
    return await Order.findAll({include: [{
        as: 'customer',
        model: Customer,
        include: [{ as: 'person', model: People }],
    }, 'branch', {
        as: 'user',
        model: User,
        include: [{ as: 'emplooy', model: Emplooy }],
    }]});
};

const getOne = async (id) => {
    const order = await Order.findByPk(id, {include: [ 'details', {
        as: 'customer',
        model: Customer,
        include: [{ as: 'person', model: People }],
    }, 'branch', {
        as: 'user',
        model: User,
        include: [{ as: 'emplooy', model: Emplooy }],
    }]});
    if(!order){
        throw boom.badRequest();
    } else {
        return order;
    };
};

const create = async (data) => {
    return await Order.create(data);
};

const update = async (id, data) => {
    const order = await getOne(id);
    return await order.update(data);
};

const remove = async (id) => {
    const order = await getOne(id);
    return await order.destroy();
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
};