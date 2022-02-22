const joi = require('joi');

const id = joi.number().integer();
const type = joi.string().max(15);

const getUserTypeSchema = joi.object({
    id: id.required(),
});

const updateUserTypeSchema = joi.object({
    type,
});

const createUserTypeSchema = joi.object({
    type: type.required(),
});

module.exports = {
    createUserTypeSchema,
    getUserTypeSchema,
    updateUserTypeSchema,
};