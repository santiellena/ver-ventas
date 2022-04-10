const { Product } = require('../../database/database').sequelize.models;
const boom = require('@hapi/boom');

const getAll = async () => {
    return await Product.findAll({include: ['department', 'exposition', 'store','unitMeasure']});
};

const getOne = async (id) => {
    const product = await Product.findByPk(id, {include: ['department', 'exposition', 'store', 'unitMeasure']});
    if(!product){
        throw boom.notFound();
    } else {
        return product;
    };
};

const create = async (data) => {
    const product = await Product.create(data);
    return product;
};

const update = async (id, changes) => {
    const productOne = await getOne(id);
    return await productOne.update(changes);
};

const remove = async (id) => {
    const product = await getOne(id);
    return await product.destroy();
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
};