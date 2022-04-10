const joi = require('joi');

const id = joi.number().integer();
const idUser = joi.number().integer();
const idBranch = joi.number().integer();
const idSupplier = joi.number().integer();
const howPaid = joi.string();
const details = joi.array();
const date = joi.string();
const totalAmount = joi.number().precision(2);

const from = joi.string();
const to = joi.string();

const getBuySchema = joi.object({
    id: id.required(),
});

const createBuySchema = joi.object({
    idUser: idUser.required(),
    idBranch: idBranch.required(),
    idSupplier: idSupplier.required(),
    howPaid: howPaid.required(),
    details: details.required(),
    date: date.required(),
    totalAmount: totalAmount.required(),
});

const updateBuySchema = joi.object({
    idUser,
    idBranch,
    idSupplier,
    howPaid,
    details,
    date,
    totalAmount,
});

const deleteBuySchema = joi.object({
    id: id.required(),
});

const getBuyByDateSchema = joi.object({
    from: from.required(),
    to: to.required(),
});

module.exports = {
    getBuySchema,
    updateBuySchema,
    deleteBuySchema,
    getBuyByDateSchema,
    createBuySchema,
};
