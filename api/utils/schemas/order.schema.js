const joi = require('joi');

const id = joi.number().integer();
const idEmplooy = joi.number().integer();
const idCustomer = joi.number().integer();
const idBranch = joi.number().integer();
const idDocType = joi.number().integer();
const invoicing = joi.number().integer().max(1);
const totalAmount = joi.number().precision(2);
const tax = joi.number().max(100);
const date = joi.string();

const getOrderSchema = joi.object({
    id: id.required(),
});

const createOrderSchema = joi.object({
    idEmplooy: idEmplooy.required(),
    idCustomer: idCustomer.required(),
    idBranch: idBranch.required(), 
    idDocType: idDocType.required(),
    invoicing: invoicing.required(),
    totalAmount: totalAmount.required(),
    tax: tax.required(),
    date: date.required(),
});

const updateOrderSchema = joi.object({
    idEmplooy,
    idCustomer,
    idBranch, 
    idDocType,
    invoicing,
    totalAmount,
    tax,
    date,
});

const deleteOrderSchema = joi.object({
    id: id.required(),
});

module.exports = {
    getOrderSchema,
    createOrderSchema,
    updateOrderSchema,
    deleteOrderSchema,
};