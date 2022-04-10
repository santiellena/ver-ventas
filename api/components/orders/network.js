const router = require('express').Router();
const response = require('../../network/response');
const validator = require('../../utils/middlewares/validator');
const { getOrderSchema, createOrderSchema, updateOrderSchema, deleteOrderSchema } = require('../../utils/schemas/order.schema');
const controller = require('./controller');
const checkAllow = require('../../utils/middlewares/chechAllow');

router.get('/', checkAllow(['menu-sells']), (req, res, next) => {
    controller.getAll()
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.get('/:id', validator(getOrderSchema, 'params'), checkAllow(['menu-sells']), (req, res, next) => {
    const { id } = req.params;
    controller.getOne(id)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});


router.post('/', validator(createOrderSchema, 'body'), checkAllow(['menu-sells']), (req, res, next) => {
    controller.create(req.body)
    .then(data => response.success(req, res, data, 201))
    .catch(err => next(err));
});

router.patch('/:id', checkAllow(['menu-sells']), validator(getOrderSchema, 'params'), validator(updateOrderSchema, 'body'), (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;
    controller.update(id, changes)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.delete('/:id', checkAllow(['menu-sells']), validator(deleteOrderSchema, 'params'), (req, res, next) => {
    const { id } = req.params;   
    controller.remove(id)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

module.exports = router;