const { CashRegister } = require('../../database/database').sequelize.models;
const boom = require('@hapi/boom');

const getOne = async (id) => {
    const cashRegister = await CashRegister.findByPk(id, {include: 'branch'});
    if(!cashRegister){
        throw boom.badRequest();
    } else {
        return cashRegister;
    };
};

const getAll = async (idBranch) => {
    return await CashRegister.findAll({
        include: ['branch'], where: { idBranch },
    });
};

const create = async (data) => {
    return await CashRegister.create(data);
};

const update = async (id, data) => {
    const cashRegister = await getOne(id);
    return await cashRegister.update(data);
};

const remove = async (id) => {
    const cashRegister = await getOne(id);
    return await cashRegister.destroy(); 
};

const getCashFlow = async (id) => {
    const cashRegister = await CashRegister.findByPk(id, {include: ['branch', 'cashFlow']});
    if(!cashRegister){
        throw boom.badRequest();
    } else {
        return cashRegister.cashFlow;
    };
};

module.exports = {
    getOne,
    getAll,
    create,
    update,
    remove,
    getCashFlow,
};