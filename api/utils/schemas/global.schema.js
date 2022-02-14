const joi = require('joi');

const id = joi.number().integer();
const empresa = joi.string().max(40);
const razonSocial = joi.string().max(40);
const nombreImpuesto = joi.string().max(4);
const porcentajeImpuesto = joi.number().precision(2).max(100);

const getGlobalSchema = joi.object({
    id: id.required(),
});

const createGlobalSchema = joi.object({
    empresa: empresa.required(),
    razonSocial: razonSocial.required(),
    nombreImpuesto: nombreImpuesto.required(),
    porcentajeImpuesto: porcentajeImpuesto.required(),
});

const updateGlobalSchema = joi.object({
    empresa,
    razonSocial,
    nombreImpuesto,
    porcentajeImpuesto,
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