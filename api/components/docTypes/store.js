const boom = require('@hapi/boom');
const { DocType } = require('../../database/database').sequelize.models;

const getOne = async (id) => {
    const docType = await DocType.findByPk(id);
    if(!docType){
     throw boom.badRequest();
    } else {
        return docType;
    };
};

const getAll = async () => {
    return await DocType.findAll();
};

const create = async (data) => {
    return await DocType.create(data);
};

const update = async (id, data) => {
    const docType = await getOne(id);
    return await docType.update(data);
};

const remove = async (id) => {
    const docType = await getOne(id);
    return await docType.destroy();
};

module.exports = {
    getOne,
    getAll,
    create,
    update,
    remove,
};