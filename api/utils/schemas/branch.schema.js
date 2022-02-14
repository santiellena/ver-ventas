const joi = require('joi');

const id = joi.number().integer();
const nombre = joi.string().max(30);
const cuit = joi.string().max(15);
const direccion = joi.string().max(30);
const telefono = joi.number().integer();
const email = joi.string().email();
const representante =  joi.string().max(45);
const estado = joi.number().integer().max(1);

const getOneBranchSchema = joi.object({
    id: id.required(),
});

const createBranchSchema = joi.object({
    nombre: nombre.required(),
    cuit: cuit.required(),
    direccion: direccion.required(),
    telefono: telefono.required(),
    email: email.required(),
    representante: representante.required(),
});

const updateBranchSchema = joi.object({
    nombre,
    cuit,
    direccion,
    telefono,
    email,
    representante,
});

const deleteBranchSchema = joi.object({
    estado: estado.required(),
});

module.exports = {
    getOneBranchSchema,
    createBranchSchema,
    updateBranchSchema,
    deleteBranchSchema,
};