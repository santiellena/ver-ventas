const express = require('express');
const router = express.Router();

const controller = require('./controller');
const response = require('../../network/response');
const checkAllow = require('../../utils/middlewares/chechAllow');
const validator = require('../../utils/middlewares/validator');
const { getBuySchema, createBuySchema, updateBuySchema, deleteBuySchema, getBuyByDateSchema } = require('../../utils/schemas/buy.schema');

router.get('/', checkAllow(['menu-buys']), (req, res, next) => {
    controller.getAll()
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.get('/:id', checkAllow(['menu-buys']), validator(getBuySchema, 'params'), (req, res, next) => {
    const { id } = req.params;
    controller.getOne(id)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.get('/date/when', checkAllow(['menu-buys']), validator(getBuyByDateSchema, 'query'), (req, res, next) => {
    const { from, to } = req.query;

    controller.getByDate(from, to)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.post('/', checkAllow(['menu-buys']), validator(createBuySchema, 'body'), (req, res, next) => {
    controller.create(req.body)
    .then(data => response.success(req, res, data, 201))
    .catch(err => next(err));
});

router.patch('/:id', checkAllow(['menu-buys']), validator(getBuySchema, 'paramas'), validator(updateBuySchema, 'body'), (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;
    controller.update(id, changes)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.delete('/:id', checkAllow(['menu-buys']), validator(deleteBuySchema, 'params'), (req, res, next) => {
    const { id } = req.params;   
    controller.remove(id)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

module.exports = router;