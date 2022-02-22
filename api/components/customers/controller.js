const storeCustomer = require('./store');
const storePeople = require('../people/store');
const boom = require('@hapi/boom');

const getAll = async () => {
    return await storeCustomer.getAll();
};

const getOne = async (id) => {
    return await storeCustomer.getOne(id);
};

const create = async (data) => {
    const person = await storePeople.create(data);
    return await storeCustomer.create({
        idPeople: person.id,
        debt: data.debt,
    });
};

const update = async (id, changes) => {
    const customer = await storeCustomer.getOne(id);
    const person = await storePeople.getOne(customer.idPeople);
    await person.update(changes);
    if(changes.debt){
         await customer.update({debt: changes.debt});
    };
    return await storeCustomer.getOne(id);
};

const remove = async (id) => {
    const customer = await storeCustomer.remove(id);
    await storePeople.remove(customer.idPeople);
    return customer;
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
};
