const joi = require('joi');

const id = joi.number().integer();
const nombre = joi.string().max(45);
const prefijo = joi.string().max(4);

const getUnitMeasureSchema = joi.object({
    id: id.required(),
});

const updateUnitMeasureSchema = joi.object({
    nombre,
    prefijo,
});

const createUnitMeasureSchema = joi.object({
    nombre: nombre.required(),
    prefijo: prefijo.required(),
});

module.exports = {
    getUnitMeasureSchema,
    updateUnitMeasureSchema,
    createUnitMeasureSchema,
};