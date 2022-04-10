const joi = require('joi');

const id = joi.number().integer();
const idBranch = joi.number().integer();
const observation = joi.string();
const date = joi.string().length(16);
const amount = joi.number().precision(2);
const idCashRegister = joi.number().integer();
const operation = joi.string().max(3);
const idEmplooy = joi.number().integer();

const getCashFlowSchema = joi.object({
    id: id.required(),
});

const getAllCashFlowSchema = joi.object({
    idBranch: idBranch.required(),
});

const updateCashFlowSchema = joi.object({
    idBranch,
    observation,
    date,
    amount,
    idCashRegister,
    operation,
    idEmplooy,
});

const deleteCashFlowSchema = joi.object({
    id: id.required(),
});

const createCashFlowSchema = joi.object({
    idBranch: idBranch.required(),
    observation: observation.required(),
    date: date.required(),
    amount: amount.required(),
    idCashRegister: idCashRegister.required(),
    operation: operation.required(),
    idEmplooy: idEmplooy.required(),
});

module.exports = {
    getAllCashFlowSchema,
    getCashFlowSchema,
    createCashFlowSchema,
    updateCashFlowSchema,
    deleteCashFlowSchema,
};