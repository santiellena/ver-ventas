const boom = require('@hapi/boom');
const { UnitMeasure } = require('../../database/database').sequelize.models;

const getOne = async (id) => {
    const measure = await UnitMeasure.findByPk(id);
    if(!measure){
        throw boom.badRequest();
    } else {
        return measure;
    };
};

const getAll = async () => {
    return await UnitMeasure.findAll();
};

const update = async (id, data) => {
    const measure = await getOne(id);
    return await measure.update(data);
};

const create = async (data) => {
    return await UnitMeasure.create(data);
};

const remove = async (id) => {
    const measure = await getOne(id);
    return await measure.destroy();
};

module.exports = {
    getOne,
    getAll,
    update,
    create,
    remove,
}