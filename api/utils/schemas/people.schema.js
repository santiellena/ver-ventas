const joi = require('joi');

const id = joi.number().integer();
const name = joi.string().max(30);
const idDocType = joi.number().integer();
const numDoc = joi.string().max(15);
const idDirDepartment = joi.number().integer();
const idDirProvince = joi.number().integer();
const idDirCity = joi.number().integer();
const dirPostCode = joi.number().integer().max(99999);
const dirStreet = joi.string().max(30);
const phoneNumber = joi.number().integer();
const email = joi.string().email();
const cbu = joi.number().integer();
const debt = joi.number().precision(2);
const cuit = joi.number().integer();

const getPeopleSchema = joi.object({
    id: id.required(),
});

const createPeopleSchema = joi.object({
    name: name.required(),
    idDocType: idDocType.required(),
    numDoc: numDoc.required(),
    idDirDepartment: idDirDepartment.required(),
    idDirProvince: idDirProvince.required(),
    idDirCity: idDirCity.required(),
    dirPostCode: dirPostCode.required(),
    dirStreet: dirStreet.required(),
    phoneNumber: phoneNumber.required(),
    email: email.required(),
    cbu: cbu.required(),
    cuit: cuit.required(),
});

const updatePeopleSchema = joi.object({
    name,
    idDocType,
    numDoc,
    idDirDepartment,
    idDirProvince,
    idDirCity,
    dirPostCode,
    dirStreet,
    phoneNumber,
    email,
    cbu,
    debt,
    cuit,
});

const deletePeopleSchema = joi.object({
    id: id.required(),
});

const createCustomerSchema = joi.object({
    name: name.required(),
    idDocType: idDocType.required(),
    numDoc: numDoc.required(),
    idDirDepartment: idDirDepartment.required(),
    idDirProvince: idDirProvince.required(),
    idDirCity: idDirCity.required(),
    dirPostCode: dirPostCode.required(),
    dirStreet: dirStreet.required(),
    phoneNumber: phoneNumber.required(),
    email: email.required(),
    debt,
    cuit: cuit.required(),
});

module.exports = {
    getPeopleSchema,
    createPeopleSchema,
    updatePeopleSchema,
    deletePeopleSchema,
    createCustomerSchema,
};