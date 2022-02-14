const boom = require('@hapi/boom');
const models = require('../../database/database').sequelize.models;

const { Branch } = models;

const getAll = async () => {
    return await Branch.findAll({where: { estado: 1}, include: ['cajas']});
};

const getOne = async (id) => {
    const branch = await Branch.findByPk(id, {include: 'cajas'});
    if(!branch || branch.estado == 0){
        throw boom.badRequest();
    } else {
        return branch;
    };
};

const create = async (data) => {
    return await Branch.create(data);
};

const update = async (id, data) => {
    const branch = await getOne(id);
    return await branch.update(data);  
};

const remove = async (id) => {
    const branch = await getOne(id);
    return await branch.destroy();  
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
};