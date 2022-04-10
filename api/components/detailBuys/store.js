const { BuyProduct } = require('../../database/database').sequelize.models;
const boom = require('@hapi/boom');

const getAll = async () => {
    return await BuyProduct.findAll();
};

const getOne = async (id) => {
    const buyProduct = await BuyProduct.findByPk(id);
    if(!buyProduct){
        throw boom.notFound();
    } else {
        return buyProduct;
    };
};

const create = async (data) => {
    const buyProduct = await BuyProduct.create(data);
    return buyProduct;
};

const update = async (id, changes) => {
    const buyProductOne = await getOne(id);
    return await buyProductOne.update(changes);
};

const remove = async (id) => {
    const buyProduct = await getOne(id);
    return await buyProduct.destroy();
};

const removeByBuy = async (idBuy) => {
    const buyProduct = await BuyProduct.findAll({where: {idBuy}});
    for (const bp of buyProduct) {
        await remove(bp.id);
    };
    return buyProduct;
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
    removeByBuy,
};