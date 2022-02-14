const joi = require('joi');

const id = joi.number().integer();
const nombre = joi.string().max(20);

const getDepartmentSchema = joi.object({
    id: id.required(),
});

const createDepartmentSchema = joi.object({
    nombre: nombre.required(),
});

const updateDepartmentSchema = joi.object({
    nombre,
});

module.exports = {
    getDepartmentSchema,
    createDepartmentSchema,
    updateDepartmentSchema,
};