const store = require('./store');
const storeOrderDetails = require('../detailOrders/store');

const getAll = async () => {
    return await store.getAll();
};

const getOne = async (id) => {
    return await store.getOne(id);
};

const create = async (data) => {
    const order = await store.create(data);
    for (const detail of data.details) {
          await storeOrderDetails.create({
              idProduct: detail.idProduct,
              idOrder: order.id,
              quantity: detail.quantity,
          });
    };
    return order;
};

const update = async (id, changes) => {
    return await store.update(id, changes);
};

const remove = async (id) => {
    await storeOrderDetails.removeBySell(id);
    return await store.remove(id);
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
};