const joi = require('joi');

const id = joi.number().integer();
const tipo = joi.string().max(15);

const getUserTypeSchema = joi.object({
    id: id.required(),
});

const updateUserTypeSchema = joi.object({
    tipo,
});

const createUserTypeSchema = joi.object({
    tipo: tipo.required(),
});

module.exports = {
    createUserTypeSchema,
    getUserTypeSchema,
    updateUserTypeSchema,
};