const express = require('express');
const router = express.Router();

const controller = require('./controller');
const response = require('../../network/response');
const checkAllow = require('../../utils/middlewares/chechAllow');
const validator = require('../../utils/middlewares/validator');
const { getSellsSchema, getSellSchema, createSellSchema, updateSellSchema, deleteSellSchema, getSellByDateSchema, deleteSellBodySchema } = require('../../utils/schemas/sell.schema.js');

router.get('/', checkAllow(['menu-sells']), (req, res, next) => {
    controller.getAll()
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.get('/last', checkAllow(['menu-sells']), validator(getSellsSchema, 'query'), (req, res, next) => {
    controller.getLast10(req.query)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.get('/date/go', checkAllow(['menu-sells']), validator(getSellByDateSchema, 'query'), (req, res, next) => {
    const { from, to } = req.query;
    controller.getByDate(from, to)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.get('/:id', checkAllow(['menu-sells']), validator(getSellSchema, 'params'), (req, res, next) => {
    const { id } = req.params;

    controller.getOne(id)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.post('/', checkAllow(['menu-sells']), validator(createSellSchema, 'body'), (req, res, next) => {
    controller.create(req.body)
    .then(data => response.success(req, res, data, 201))
    .catch(err => next(err));
});

router.patch('/:id', checkAllow(['menu-sells']), validator(getSellSchema, 'paramas'), validator(updateSellSchema, 'body'), (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;
    controller.update(id, changes)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.delete('/:id', checkAllow(['menu-sells']), checkAllow(['menu-admin']), validator(deleteSellSchema, 'params'), validator(deleteSellBodySchema, 'body'), (req, res, next) => {
    const { id } = req.params;
    const { idCashRegister } = req.body;   
    controller.remove(id, idCashRegister)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

module.exports = router;