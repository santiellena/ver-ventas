const joi = require('joi');

const id = joi.number().integer();
const idUser = joi.number().integer();
const idCustomer = joi.number().integer();
const idBranch = joi.number().integer();
const invoicing = joi.number().integer().max(1);
const totalAmount = joi.number().precision(2);
const date = joi.string();
const priceList = joi.string();
const details = joi.array();

const getOrderSchema = joi.object({
    id: id.required(),
});

const createOrderSchema = joi.object({
    idUser: idUser.required(),
    idCustomer: idCustomer.required(),
    idBranch: idBranch.required(), 
    invoicing: invoicing.required(),
    totalAmount: totalAmount.required(),
    date: date.required(),
    priceList: priceList.required(),
    details: details.required(),
});

const updateOrderSchema = joi.object({
    idUser,
    idCustomer,
    idBranch, 
    invoicing,
    totalAmount,
    date,
    priceList,
    details,
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