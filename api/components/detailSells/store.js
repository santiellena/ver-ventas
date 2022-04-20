const { SellProduct } = require('../../database/database').sequelize.models;
const boom = require('@hapi/boom');

const getAll = async () => {
    return await SellProduct.findAll();
};

const getOne = async (id) => {
    const sellProduct = await SellProduct.findByPk(id);
    if(!sellProduct){
        throw boom.notFound();
    } else {
        return sellProduct;
    };
};

const create = async (data) => {
    const sellProduct = await SellProduct.create(data);
    return sellProduct;
};

const update = async (id, changes) => {
    const sellProductOne = await getOne(id);
    return await sellProductOne.update(changes);
};

const remove = async (id) => {
    const sellProduct = await getOne(id);
    return await sellProduct.destroy();
};

const removeBySell = async (idSell) => {
    const sellProduct = await SellProduct.findAll({where: {idSell}});
    for (const bp of sellProduct) {
        await remove(bp.id);
    };
    return sellProduct;
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
    removeBySell,
};