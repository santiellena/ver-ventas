const boom = require('@hapi/boom');
const { DebtPaid, User, Emplooy } = require('../../database/database').sequelize.models;

const getAll = async () => {
    return await DebtPaid.findAll({include: ['customer', {
        as: 'user',
        model: User,
        include: [{ as: 'emplooy', model: Emplooy}],
    }]});
};

const getAllByCustomer = async (idCustomer) => {
    return await DebtPaid.findAll({include: ['customer', {
        as: 'user',
        model: User,
        include: [{ as: 'emplooy', model: Emplooy}],
    }]}, { where: {idCustomer}});
};

const getOne = async (id) => {
    const debtPaid = await DebtPaid.findByPk(id, {include: ['customer', {
        as: 'user',
        model: User,
        include: [{ as: 'emplooy', model: Emplooy}],
    }]});
    if(!debtPaid){
        throw boom.badRequest();
    } else {
        return debtPaid;
    };
};

const create = async (data) => {
    return await DebtPaid.create(data);
};

const update = async (id, data) => {
    const debtPaid = await getOne(id);
    return await debtPaid.update(data);
};

const remove = async (id) => {
    const debtPaid = await getOne(id);
    return await debtPaid.destroy();
};

module.exports = {
    getAll,
    getOne,
    getAllByCustomer,
    create,
    update,
    remove,
};