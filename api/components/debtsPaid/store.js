const boom = require('@hapi/boom');
const { DebtPaid } = require('../../database/database').sequelize.models;

const getAll = async () => {
    return await DebtPaid.findAll({include: ['customer', 'emplooy']});
};

const getOne = async (id) => {
    const debtPaid = await DebtPaid.findByPk(id, { include: ['customer', 'emplooy']});
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
    create,
    update,
    remove,
};