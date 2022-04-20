const router = require('express').Router();
const response = require('../../network/response');
const validator = require('../../utils/middlewares/validator');
const { getDebtPaidSchema, createDebtPaidSchema, updateDebtPaidSchema, deleteDebtPaidSchema } = require('../../utils/schemas/debtPaid.schema');
const controller = require('./controller');
const checkAllow = require('../../utils/middlewares/chechAllow');

router.get('/', checkAllow(['menu-stock']), (req, res, next) => {
    controller.getAll()
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.get('/:id', validator(getDebtPaidSchema, 'params'), checkAllow(['menu-stock']), (req, res, next) => {
    const { id } = req.params;
    controller.getAllByCustomer(id)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});


router.post('/', validator(createDebtPaidSchema, 'body'), checkAllow(['menu-stock']), (req, res, next) => {
    controller.create(req.body)
    .then(data => response.success(req, res, data, 201))
    .catch(err => next(err));
});

router.patch('/:id', checkAllow(['menu-stock']), validator(getDebtPaidSchema, 'params'), validator(updateDebtPaidSchema, 'body'), (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;
    controller.update(id, changes)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.delete('/:id', checkAllow(['menu-stock']), validator(deleteDebtPaidSchema, 'params'), (req, res, next) => {
    const { id } = req.params;   
    controller.remove(id)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

module.exports = router;