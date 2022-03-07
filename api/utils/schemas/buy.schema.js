const joi = require('joi');

const id = joi.number().integer();
const idEmplooy = joi.number().integer();
const idBranch = joi.number().integer();
const idSupplier = joi.number().integer();
const howPaid = joi.string();
const details = joi.array();
const date = joi.string();

const from = joi.string();
const to = joi.string();

const getBuySchema = joi.object({
    id: id.required(),
});

const createBuySchema = joi.object({
    idEmplooy: idEmplooy.required(),
    idBranch: idBranch.required(),
    idSupplier: idSupplier.required(),
    howPaid: howPaid.required(),
    details: details.required(),
    date: date.required(),
});

const updateBuySchema = joi.object({
    idEmplooy,
    idBranch,
    idSupplier,
    howPaid,
    details,
    date,
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
