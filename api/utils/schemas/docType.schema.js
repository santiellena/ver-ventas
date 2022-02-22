const joi = require('joi');

const id = joi.number().integer();
const description = joi.string().max(20);

const getDocTypeSchema = joi.object({
    id: id.required(),
});

const createDocTypeSchema = joi.object({
    description: description.required(),
});

const updateDocTypeSchema = joi.object({
    description,
});

module.exports = {
    getDocTypeSchema,
    createDocTypeSchema,
    updateDocTypeSchema,
};