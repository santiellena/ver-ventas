const joi = require('joi');

const id = joi.number().integer();
const apellidos = joi.string().max(30);
const nombre = joi.string().max(15);
const idTipoDocumento = joi.number().integer();
const numeroDocumento = joi.string().max(15);
const direccion = joi.string().max(30);
const telefono = joi.number().integer();
const email = joi.string().email();
const fechaNacimiento = joi.string().max(10);

const getEmplooySchema = joi.object({
    id: id.required(),
});

const createEmplooySchema = joi.object({
    apellidos: apellidos.required(),
    nombre: nombre.required(),
    idTipoDocumento: idTipoDocumento.required(),
    numeroDocumento: numeroDocumento.required(),
    direccion,
    telefono,
    email,
    fechaNacimiento,
});

const updateEmploySchema = joi.object({
    apellidos,
    nombre,
    direccion,
    idTipoDocumento,
    numeroDocumento,
    telefono,
    email,
    fechaNacimiento,
});

module.exports = {
    getEmplooySchema,
    updateEmploySchema,
    createEmplooySchema,
};