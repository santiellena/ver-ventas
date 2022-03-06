const joi = require('joi');

const id = joi.number().integer();
const fantasyName = joi.string().max(40);
const businessName = joi.string().max(40);
const taxName = joi.string().max(4);
const taxPercentage = joi.number().precision(2).max(100);

const getGlobalSchema = joi.object({
    id: id.required(),
});

const createGlobalSchema = joi.object({
    fantasyName: fantasyName.required(),
    businessName: businessName.required(),
    taxName: taxName.required(),
    taxPercentage: taxPercentage.required(),
});

const updateGlobalSchema = joi.object({
    fantasyName,
    businessName,
    taxName,
    taxPercentage,
});

const deleteGlobalSchema = joi.object({
    id: id.required(),
});

module.exports = {
    getGlobalSchema,
    createGlobalSchema,
    updateGlobalSchema,
    deleteGlobalSchema,
};