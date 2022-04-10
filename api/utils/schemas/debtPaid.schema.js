const joi = require('joi');

const id = joi.number().integer();
const howPaid = joi.string();
const observation = joi.string();
const idCustomer = joi.number().integer();
const idEmplooy = joi.number().integer();
const amount = joi.number();
const date = joi.string();

const getDebtPaidSchema = joi.object({
    id: id.required(),
});

const updateDebtPaidSchema = joi.object({
    howPaid,
    observation,
    idCustomer,
    idEmplooy,
    amount,
    date,
});

const createDebtPaidSchema = joi.object({
    howPaid: howPaid.required(),
    observation: observation.required(),
    idCustomer: idCustomer.required(),
    idEmplooy: idEmplooy.required(),
    amount: amount.required(),
    date: date.required(),
});

const deleteDebtPaidSchema = joi.object({
    id: id.required(),
});

module.exports = {
    getDebtPaidSchema,
    updateDebtPaidSchema,
    createDebtPaidSchema,
    deleteDebtPaidSchema,
};