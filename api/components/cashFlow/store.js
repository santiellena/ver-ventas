const { sequelize } = require('../../database/database');
const { models } = sequelize;
const { CashFlow } = models;
const boom = require('@hapi/boom');

const getAll = async (idBranch) => {
    return await CashFlow.findAll({where: {idBranch}, include: ['emplooy','branch','cashRegister']});
};

const getOne = async (id) => {
    const cashFlow = await CashFlow.findByPk(id);
    if(!cashFlow){
        throw boom.notFound();
    } else {
        return cashFlow;
    };
};

const create = async (data) => {
    const cashFlow = await CashFlow.create(data);
    return cashFlow;
};

const update = async (id, changes) => {
    const cashFlowOne = await getOne(id);
    return await cashFlowOne.update(changes);
};

const remove = async (id) => {
    const cashFlow = await getOne(id);
    return await cashFlow.destroy();
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
};