const router = require('express').Router();
const response = require('../../network/response');
const { getEmplooySchema, updateEmploySchema, createEmplooySchema } = require('../../utils/schemas/emplooy.schema');
const validator = require('../../utils/middlewares/validator');
const controller = require('./controller');

router.get('/', (req, res, next) => {
    controller.getAll()
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.get('/:id', validator(getEmplooySchema, 'params'), (req, res, next) => {
    const { id } = req.params;
    controller.getOne(id)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.post('/', validator(createEmplooySchema, 'body'), (req, res, next) => {
    controller.create(req.body)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.patch('/:id', validator(getEmplooySchema, 'params'), validator(updateEmploySchema, 'body'), (req, res, next) => {
    const { id } = req.params;
    controller.update(id, req.body)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.delete('/:id', validator(getEmplooySchema, 'params'), (req, res, next) => {
    const { id } = req.params;
    controller.remove(id)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

module.exports = router;