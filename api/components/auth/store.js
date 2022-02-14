const { User } = require('../../database/database').sequelize.models;
const boom = require('@hapi/boom');

const getOneByUsername = async (username) => {
    const user = await User.findOne({where: {username: username}, include: ['empleado', 'tipoUsuario']});
    return user;
};

const getAll = async () => {
    return await User.findAll({include: ['empleado','tipoUsuario']});
};

const getOne = async (id) => {
    const user = await User.findByPk(id, {include: ['empleado','tipoUsuario']});
    if(!user){
        throw boom.badRequest();
    } else {
        return user;
    };
};

const create = async (data) => {
    return await User.create(data);
};

const update = async (id, data) => {
    const user = await getOne(id);
    return await user.update(data);
};

const remove = async (id) => {
    const user = await getOne(id);
    return await user.destroy();
};

module.exports = {
    getOneByUsername,
    getOne,
    getAll,
    create,
    update,
    remove,
};