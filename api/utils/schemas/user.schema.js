const joi = require('joi');

const id = joi.number().integer();
const idEmpleado = joi.number().integer();
const idTipoUsuario = joi.number().integer();
const menuAlmacen = joi.number().integer().max(1);
const menuCompras = joi.number().integer().max(1);
const menuVentas = joi.number().integer().max(1);
const menuMantenimiento = joi.number().integer().max(1);
const menuConsultas = joi.number().integer().max(1);
const menuAdmin = joi.number().integer().max(1);
const menuFacturacion = joi.number().integer().max(1);
const username = joi.string().max(15);
const password = joi.string().max(15);

const getUserSchema = joi.object({
    id: id.required(),
});

const createUserSchema = joi.object({
    idEmpleado: idEmpleado.required(),
    idTipoUsuario: idTipoUsuario.required(),
    menuAlmacen,
    menuCompras,
    menuVentas,
    menuMantenimiento,
    menuConsultas,
    menuAdmin,
    menuFacturacion,
    username: username.required(),
    password: password.required(),
});

const updateUserSchema = joi.object({
    idTipoUsuario,
    menuAlmacen,
    menuCompras,
    menuVentas,
    menuMantenimiento,
    menuConsultas,
    menuAdmin,
    menuFacturacion,
    username,
    password,
});

module.exports = {
    getUserSchema,
    updateUserSchema,
    createUserSchema,
};