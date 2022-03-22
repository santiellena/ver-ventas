const express = require('express');
const router = express.Router();

const controller = require('./controller');
const response = require('../../network/response');
const checkAllow = require('../../utils/middlewares/chechAllow');
const validator = require('../../utils/middlewares/validator');
const { getCashRegisterSchema, createCashRegisterSchema, updateCashRegisterSchema, deleteCashRegisterSchema } = require('../../utils/schemas/cashRegister.schema');

router.get('/', validator(getCashRegisterSchema, 'body'), (req, res, next) => {
    const idBranch = req.body.id;
    controller.getAll(idBranch)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.get('/:id', validator(getCashRegisterSchema, 'params'), (req, res, next) => {
    const { id } = req.params;

    controller.getOne(id)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.post('/', validator(createCashRegisterSchema, 'body'), (req, res, next) => {
    controller.create(req.body)
    .then(data => response.success(req, res, data, 201))
    .catch(err => next(err));
});

router.patch('/:id', validator(getCashRegisterSchema, 'paramas'), validator(updateCashRegisterSchema, 'body'), (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;
    controller.update(id, changes)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.delete('/:id', validator(deleteCashRegisterSchema, 'params'), (req, res, next) => {
    const { id } = req.params;   
    controller.remove(id)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.get('/cash-flow/:id', validator(getCashRegisterSchema, 'params'), (req, res, next) => {
    const { id } = req.params;
    controller.getCashFlow(id)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

module.exports = router;