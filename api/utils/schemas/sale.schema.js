const joi = require('joi');

const id = joi.number().integer();
const idProduct = joi.number().integer();
const fromDate = joi.string().length(10);
const toDate = joi.string().length(10);
const discount = joi.number().precision(2);
const productChange = joi.number().integer().max(1);

const getSaleSchema = joi.object({ id: id.required(), });

const createSaleSchema = joi.object({
    idProduct: idProduct.required(),
    fromDate: fromDate.required(),
    toDate: toDate.required(),
    discount: discount.required(),
    productChange: productChange.required(),
});

const updateSaleSchema = joi.object({
    idProduct,
    fromDate,
    toDate,
    discount,
    productChange,
});

const deleteSaleSchema = joi.object({ id: id.required(), });

module.exports = {
    getSaleSchema,
    createSaleSchema,
    updateSaleSchema,
    deleteSaleSchema,
};  