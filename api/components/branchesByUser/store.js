const { BranchUser } = require('../../database/database').sequelize.models;
const boom = require('@hapi/boom');

const getAll = async () => {
    return await BranchUser.findAll();
};

const getOne = async (id) => {
    const branchUser = await BranchUser.findByPk(id);
    if(!branchUser){
        throw boom.notFound();
    } else {
        return branchUser;
    };
};

const create = async (data) => {
    const branchUser = await BranchUser.create(data);
    return branchUser;
};

const update = async (id, changes) => {
    const branchUserOne = await getOne(id);
    return await branchUserOne.update(changes);
};

const remove = async (id) => {
    const branchUser = await getOne(id);
    return await branchUser.destroy();
};

const updateByNewArray = async (branches, idUser) => {
    const branchesUser = await BranchUser.findAll({where: {idUser}});
    for (const branchUser of branchesUser) {
        await branchUser.destroy();  
    };
    for (const branch of branches) {
        await create({idUser, idBranch: branch});
    };
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
    updateByNewArray,
};