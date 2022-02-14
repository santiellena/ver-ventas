const joi = require('joi');

const id = joi.number().integer();
const idSucursal = joi.number().integer();
const dinero = joi.number().precision(2);

const getCashRegisterSchema = joi.object({
    id: id.required(),
});

const updateCashRegisterSchema = joi.object({
    idSucursal,
    dinero,
});

const createCashRegisterSchema = joi.object({
    idSucursal: idSucursal.required(),
    dinero,
});

module.exports = {
    getCashRegisterSchema,
    updateCashRegisterSchema,
    createCashRegisterSchema,
};