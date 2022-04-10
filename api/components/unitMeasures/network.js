const router = require('express').Router();
const validator = require('../../utils/middlewares/validator');
const response = require('../../network/response');
const controller = require('./controller');
const { getUnitMeasureSchema, createUnitMeasureSchema, updateUnitMeasureSchema } = require('../../utils/schemas/unitMeasure.schema');
const checkAllow = require('../../utils/middlewares/chechAllow');

router.get('/', (req, res, next) => {
    controller.getAll()
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.get('/:id', validator(getUnitMeasureSchema, 'params'), (req, res, next) => {
    const { id } = req.params;
    controller.getOne(id)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.post('/', validator(createUnitMeasureSchema, 'body'), (req, res, next) => {
    controller.create(req.body)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.patch('/:id', validator(getUnitMeasureSchema, 'params'), validator(updateUnitMeasureSchema, 'body'), (req, res, next) => {
    const { id } = req.params;
    controller.update(id, req.body)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.delete('/:id', validator(getUnitMeasureSchema, 'params'), (req, res, next) => {
    const { id } = req.params;
    controller.remove(id)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

module.exports = router;