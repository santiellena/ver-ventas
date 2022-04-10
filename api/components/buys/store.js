const { Buy, User, People, Supplier, Emplooy } = require('../../database/database').sequelize.models;
const boom = require('@hapi/boom');

const getAll = async () => {
    return await Buy.findAll({include: ['branch', {
        as: 'user',
        model: User,
        include: [{
            as: 'emplooy',
            model: Emplooy,
        }],
    }, {
        as: 'supplier',
        model: Supplier,
        include: [{
            as: 'person',
            model: People,
        }],
    }, 'details']});
};

const getOne = async (id) => {
    const buy = await Buy.findByPk(id, {include: ['branch', 'user', 'supplier', 'details']});
    if(!buy){
        throw boom.notFound();
    } else {
        return buy;
    };
};

const create = async (data) => {
    const buy = await Buy.create(data);
    return buy;
};

const update = async (id, changes) => {
    const buyOne = await getOne(id);
    return await buyOne.update(changes);
};

const remove = async (id) => {
    const buy = await getOne(id);
    return await buy.destroy();
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
};