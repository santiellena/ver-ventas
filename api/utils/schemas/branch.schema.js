const joi = require('joi');

const id = joi.number().integer();
const name = joi.string().max(30);
const cuit = joi.string().max(15);
const dirStreet = joi.string().max(30);
const phoneNumber = joi.number().integer();
const email = joi.string().email();
const representative =  joi.string().max(45);

const getOneBranchSchema = joi.object({
    id: id.required(),
});

const createBranchSchema = joi.object({
    name: name.required(),
    cuit: cuit.required(),
    dirStreet: dirStreet.required(),
    phoneNumber: phoneNumber.required(),
    email: email.required(),
    representative: representative.required(),
});

const updateBranchSchema = joi.object({
    name,
    cuit,
    dirStreet,
    phoneNumber,
    email,
    representative,
});

const deleteBranchSchema = joi.object({
    id: id.required(),
});

module.exports = {
    getOneBranchSchema,
    createBranchSchema,
    updateBranchSchema,
    deleteBranchSchema,
};