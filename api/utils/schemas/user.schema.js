const joi = require('joi');

const id = joi.number().integer();
const idEmplooy = joi.number().integer();
const idUserType = joi.number().integer();
const menuStock = joi.number().integer().max(1);
const menuBuys = joi.number().integer().max(1);
const menuSells = joi.number().integer().max(1);
const menuMaintenance = joi.number().integer().max(1);
const menuQueries = joi.number().integer().max(1);
const menuAdmin = joi.number().integer().max(1);
const menuInvoicing = joi.number().integer().max(1);
const username = joi.string().max(15);
const password = joi.string().max(15);
const branches = joi.array().min(1);
const token = joi.any();

const getUserSchema = joi.object({
    id: id.required(),
});

const createUserSchema = joi.object({
    idEmplooy: idEmplooy.required(),
    idUserType: idUserType.required(),
    menuStock,
    menuBuys,
    menuSells,
    menuMaintenance,
    menuQueries,
    menuAdmin,
    menuInvoicing,
    username: username.required(),
    password: password.required(),
    branches: branches.required(),
});

const updateUserSchema = joi.object({
    idUserType,
    menuStock,
    menuBuys,
    menuSells,
    menuMaintenance,
    menuQueries,
    menuAdmin,
    menuInvoicing,
    username,
    password,
    branches,
});

const tokenSchema = joi.object({
    token: token.required(),
});

module.exports = {
    getUserSchema,
    updateUserSchema,
    createUserSchema,
    tokenSchema,
};