const joi = require('joi');

const id = joi.number().integer();
const longDescription = joi.string().max(45);
const shortDescription = joi.string().max(4);

const getUnitMeasureSchema = joi.object({
    id: id.required(),
});

const updateUnitMeasureSchema = joi.object({
    longDescription,
    shortDescription,
});

const createUnitMeasureSchema = joi.object({
    longDescription: longDescription.required(),
    shortDescription: shortDescription.required(),
});

module.exports = {
    getUnitMeasureSchema,
    updateUnitMeasureSchema,
    createUnitMeasureSchema,
};