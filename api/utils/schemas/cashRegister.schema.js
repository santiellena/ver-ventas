const joi = require('joi');

const id = joi.number().integer();
const idBranch = joi.number().integer();
const moneyAmount = joi.number().precision(2);

const getCashRegisterSchema = joi.object({
    id: id.required(),
});

const updateCashRegisterSchema = joi.object({
    idBranch,
    moneyAmount,
});

const createCashRegisterSchema = joi.object({
    idBranch: idBranch.required(),
    moneyAmount,
});

module.exports = {
    getCashRegisterSchema,
    updateCashRegisterSchema,
    createCashRegisterSchema,
};