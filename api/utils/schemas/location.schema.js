const joi = require('joi');

const id = joi.number().integer();
const description = joi.string().max(30);
const idBranch = joi.number().integer();

const getLocationSchema = joi.object({
    id: id.required(),
});

const createLocationSchema = joi.object({
    description: description.required(),
    idBranch: idBranch.required(),
});

const updateLocationSchema = joi.object({
    idBranch,
    description,
});

const deleteLocationSchema = joi.object({
    id: id.required(),
});

module.exports = {
    getLocationSchema,
    createLocationSchema,
    updateLocationSchema,
    deleteLocationSchema,
};