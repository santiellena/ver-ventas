const store = require('./store');

const getAll = async () => {
    return await store.getAll();
};

const getAllByCustomer = async (idCustomer) => {
    return await store.getAllByCustomer(idCustomer);
};

const getOne = async (id) => {
    return await store.getOne(id);
};

const create = async (data) => {
    if(data){
        return await store.create(data);
    };
};

const update = async (id, changes) => {
    return await store.update(id, changes);
};

const remove = async (id) => {
    return await store.remove(id);
};

module.exports = {
    getAll,
    getOne,
    getAllByCustomer,
    create,
    update,
    remove,
};