const joi = require('joi');

const id = joi.number().integer();
const lastname = joi.string().max(30);
const name = joi.string().max(15);
const idDocType = joi.number().integer();
const numDoc = joi.string().max(15);
const dirStreet = joi.string().max(30);
const phoneNumber = joi.number().integer();
const email = joi.string().email();
const birthDate = joi.string().max(10);

const getEmplooySchema = joi.object({
    id: id.required(),
});

const createEmplooySchema = joi.object({
    lastname: lastname.required(),
    name: name.required(),
    idDocType: idDocType.required(),
    numDoc: numDoc.required(),
    dirStreet,
    phoneNumber,
    email,
    birthDate,
});

const updateEmploySchema = joi.object({
    lastname,
    name,
    dirStreet,
    idDocType,
    numDoc,
    phoneNumber,
    email,
    birthDate,
});

module.exports = {
    getEmplooySchema,
    updateEmploySchema,
    createEmplooySchema,
};