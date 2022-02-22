const auth = require('../../auth/index');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const store = require('./store');
const storeBranchUser = require('../branchesByUser/store');
const apiKeyService = require('../../auth/apiKeyService');

const login = async (username, password, token) => {
    if(!username || !password || !token){
        throw boom.badRequest('No data');
    };
    if(apiKeyService.checkToken(token) == false){
        throw boom.badData('Invalid Token Access');
    };
    const user = await store.getOneByUsername(username);
    const permissions = [];
    if(user.menuStock == 1){
        permissions.push('menu-stock');
    };
    if(user.menuSells == 1){
        permissions.push('menu-sells');
    };
    if(user.menuBuys == 1){
        permissions.push('menu-buys');
    };
    if(user.menuAdmin == 1){
        permissions.push('menu-admin');
    };
    if(user.menuQueries == 1){
        permissions.push('menu-queries');
    };
    if(user.menuMaintenance == 1){
        permissions.push('menu-maintenance');
    };
    if(user.menuInvoicing == 1){
        permissions.push('menu-invoicing');
    };
    return bcrypt.compare(password, user.password)
        .then(equal => {
            if(equal == true){
               const tokenData = {
                    id: user.id,
                    scopes: permissions,
                };
                
                return auth.sign(tokenData);  //Returns TOKEN
            } else{

                return boom.unauthorized('Incorrect Information', 401);
            };
        })
        .catch();
};

const getAll = async () => {
    return await store.getAll();
};

const getOne = async (id) => {
    return await store.getOne(id);
};

const create = async (data) => {
    const SALT_ROUNDS = 8;
    data.password = await bcrypt.hash(data.password, SALT_ROUNDS);
    const user = await store.create(data);
    for (const idBranch of data.branches) {
        await storeBranchUser.create({idBranch, idUser: user.id});  
    };
    return await getOne(user.id);
};

const update = async (id, data) => {
    const SALT_ROUNDS = 8;
    if(data.password){
        data.password = await bcrypt.hash(data.password, SALT_ROUNDS);
    };
    return await store.update(id, data);
};

const remove = async (id) => {
    return await store.remove(id);
};

module.exports = {
    login,
    getAll,
    getOne,
    create,
    update,
    remove,
};