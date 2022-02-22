const boom = require('@hapi/boom');
const { Department } = require('../../database/database').sequelize.models;

const getOne = async (id) => {
    const department = await Department.findByPk(id, {include: ['products']});
    if(!department){
     throw boom.badRequest();
    } else {
        return department;
    };
};

const getAll = async () => {
    return await Department.findAll({include: ['products']});
};

const create = async (data) => {
    return await Department.create(data);
};

const update = async (id, data) => {
    const department = await getOne(id);
    return await department.update(data);
};

const remove = async (id) => {
    const department = await getOne(id);
    return await department.destroy();
};

module.exports = {
    getOne,
    getAll,
    create,
    update,
    remove,
};