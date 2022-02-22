const storeSupplier = require('./store');
const storePeople = require('../people/store');
const boom = require('@hapi/boom');

const getAll = async () => {
    return await storeSupplier.getAll();
};

const getOne = async (id) => {
    return await storeSupplier.getOne(id);
};

const create = async (data) => {
    const person = await storePeople.create(data);
    return await storeSupplier.create({
        idPeople: person.id,
    });
};

const update = async (id, changes) => {
    const supplier = await storeSupplier.getOne(id);
    const person = await storePeople.getOne(supplier.idPeople);
    await person.update(changes);
    return await storeSupplier.getOne(id);
};

const remove = async (id) => {
    const supplier = await storeSupplier.remove(id);
    await storePeople.remove(supplier.idPeople);
    return supplier;
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
};
