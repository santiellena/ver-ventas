const { OrderProduct } = require('../../database/database').sequelize.models;
const boom = require('@hapi/boom');

const getAll = async () => {
    return await OrderProduct.findAll();
};

const getOne = async (id) => {
    const orderProduct = await OrderProduct.findByPk(id);
    if(!orderProduct){
        throw boom.notFound();
    } else {
        return orderProduct;
    };
};

const create = async (data) => {
    const orderProduct = await OrderProduct.create(data);
    return orderProduct;
};

const update = async (id, changes) => {
    const buyProductOne = await getOne(id);
    return await buyProductOne.update(changes);
};

const remove = async (id) => {
    const orderProduct = await getOne(id);
    return await orderProduct.destroy();
};

const removeBySell = async (idOrder) => {
    const orderProduct = await OrderProduct.findAll({where: {idOrder}});
    for (const bp of orderProduct) {
        await remove(bp.id);
    };
    return orderProduct;
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
    removeBySell,
};