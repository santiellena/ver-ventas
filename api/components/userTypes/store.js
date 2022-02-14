const boom = require('@hapi/boom');
const { UserType } = require('../../database/database').sequelize.models;

const getAll = async () => {
    return await UserType.findAll();
};

const getOne = async (id) => {
    const userType = await UserType.findByPk(id);
    if(!userType){
        throw boom.notFound();
    } else {
        return userType;
    };
};

const create = async (data) => {
    const userType = await UserType.create(data);
    return userType;
};

const update = async (id, changes) => {
    const globalOne = await getOne(id);
    return await globalOne.update(changes);
};

const remove = async (id) => {
    const userType = await getOne(id);
    return await userType.destroy();
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
};