const joi = require('joi');

const id = joi.number().integer();
const nombre = joi.string().max(20);

const getDocTypeSchema = joi.object({
    id: id.required(),
});

const createDocTypeSchema = joi.object({
    nombre: nombre.required(),
});

const updateDocTypeSchema = joi.object({
    nombre,
});

module.exports = {
    getDocTypeSchema,
    createDocTypeSchema,
    updateDocTypeSchema,
};