const joi = require('joi');

const id = joi.number().integer();
const idDepartment = joi.number().integer();
const idExposition = joi.number().integer();
const idStore = joi.number().integer();
const idUnitMeasure = joi.number().integer();
const description = joi.string().max(45);
const stock = joi.number().precision(2);
const stockMin = joi.number().precision(2);
const onSale = joi.number().integer().max(1);
const unitPrice = joi.number().precision(2);
const buyPrice = joi.number().precision(2);
const wholesalerPrice = joi.number().precision(2);
const details = joi.array();
const offset = joi.number().integer();

const getLast7Schema = joi.object({
    offset: offset.required(),
});

const getProductSchema = joi.object({
    id: id.required(),
});

const createProductSchema = joi.object({
    id: id.required(),
    idDepartment: idDepartment.required(),
    idStore: idStore.required(),
    idExposition: idExposition.required(),
    description: description.required(),
    idUnitMeasure: idUnitMeasure.required(),
    stock,
    stockMin,
    unitPrice,
    buyPrice,
    wholesalerPrice,
    onSale,
});

const updateProductSchema = joi.object({
    id,
    idDepartment,
    idStore,
    idExposition,
    description,
    idUnitMeasure,
    stock,
    stockMin,
    unitPrice,
    buyPrice,
    wholesalerPrice,
    onSale,
});

const deleteProductSchema = joi.object({
    id: id.required(),
});

const updateByDetailSchema = joi.object({
    details: details.required(),
});

module.exports = {
    getProductSchema,
    getLast7Schema,
    deleteProductSchema,
    createProductSchema, 
    updateProductSchema,
    updateByDetailSchema,
};