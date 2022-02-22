const joi = require('joi');

const id = joi.number().integer();
const idDepartment = joi.number().integer();
const idSupplier = joi.number().integer();
const idExposition = joi.number().integer();
const idStore = joi.number().integer();
const idUnitMeasure = joi.number().integer();
const description = joi.string().max(45);
const stock = joi.number().integer();
const stockMin = joi.number().integer();
const onSale = joi.number().integer().max(1);
const unitPrice = joi.number().precision(2);
const buyPrice = joi.number().precision(2);
const wholesalerPrice = joi.number().precision(2);

const getProductSchema = joi.object({
    id: id.required(),
});

const createProductSchema = joi.object({
    id: id.required(),
    idDepartment: idDepartment.required(),
    idSupplier: idSupplier.required(),
    idStore: idStore.required(),
    idExposition: idExposition.required(),
    description: description.required(),
    idUnitMeasure: idUnitMeasure.required(),
    stock,
    stockMin,
    unitPrice,
    buyPrice,
    wholesalerPrice,
});

const updateProductSchema = joi.object({
    id,
    idDepartment,
    idStore,
    idExposition,
    idSupplier,
    description,
    idUnitMeasure,
    stock,
    stockMin,
    unitPrice,
    buyPrice,
    wholesalerPrice,
});

const deleteProductSchema = joi.object({
    id: id.required(),
});

module.exports = {
    getProductSchema,
    deleteProductSchema,
    createProductSchema, 
    updateProductSchema,
};