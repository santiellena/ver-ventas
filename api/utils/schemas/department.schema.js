const joi = require('joi');

const id = joi.number().integer();
const description = joi.string().max(20);

const getDepartmentSchema = joi.object({
    id: id.required(),
});

const createDepartmentSchema = joi.object({
    description: description.required(),
});

const updateDepartmentSchema = joi.object({
    description,
});

module.exports = {
    getDepartmentSchema,
    createDepartmentSchema,
    updateDepartmentSchema,
};