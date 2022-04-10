const joi = require('joi');

const id = joi.number().integer();
const amount = joi.number().precision(2);
const idBranch = joi.number().integer();
const idCustomer = joi.number().integer();
const idEmplooy = joi.number().integer();
const howMuchPaid = joi.number().precision(2);
const howPaid = joi.string();
const details = joi.array();
const priceList = joi.string();
const from = joi.string();
const to = joi.string();

const getSellSchema = joi.object({ id: id.required(), });

const createSellSchema = joi.object({
    amount: amount.required(),
    idBranch: idBranch.required(),
    idCustomer: idCustomer.required(),
    idEmplooy: idEmplooy.required(),
    howMuchPaid: howMuchPaid.required(),
    howPaid: howPaid.required(),
    details: details.required(),
    priceList: priceList.required(),
});

const updateSellSchema = joi.object({
    amount,
    idBranch,
    idCustomer,
    idEmplooy,
    howPaid,
    details,
    priceList,
    howMuchPaid,
});

const deleteSellSchema = joi.object({ id: id.required(), });

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
};