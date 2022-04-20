const joi = require('joi');

const id = joi.number().integer();
const totalAmount = joi.number().precision(2);
const idBranch = joi.number().integer();
const idCustomer = joi.number().integer();
const idUser = joi.number().integer();
const howMuchPaid = joi.number().precision(2);
const howPaid = joi.string();
const details = joi.array();
const priceList = joi.string();
const from = joi.string();
const to = joi.string();
const date = joi.string();

const getSellSchema = joi.object({ id: id.required(), });

const createSellSchema = joi.object({
    date: date.required(),
    totalAmount: totalAmount.required(),
    idBranch: idBranch.required(),
    idCustomer: idCustomer.required(),
    idUser: idUser.required(),
    howMuchPaid: howMuchPaid.required(),
    howPaid: howPaid.required(),
    details: details.required(),
    priceList: priceList.required(),
});

const updateSellSchema = joi.object({
    totalAmount,
    idBranch,
    idCustomer,
    idUser,
    howPaid,
    details,
    priceList,
    howMuchPaid,
});

const deleteSellSchema = joi.object({ id: id.required(), });

const deleteSellBodySchema = joi.object({
    idCashRegister: id.required(),
});

const getSellByDateSchema = joi.object({
    from: from.required(),
    to: to.required(),
});

module.exports = {
    updateSellSchema,
    getSellSchema,
    createSellSchema,
    deleteSellSchema,
    getSellByDateSchema,
    deleteSellBodySchema,
};