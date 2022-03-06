const router = require('express').Router();
const response = require('../../network/response');
const controller = require('./controller');
const validator = require('../../utils/middlewares/validator');
const { getDocTypeSchema, updateDocTypeSchema, createDocTypeSchema } = require('../../utils/schemas/docType.schema');
const checkAllow = require('../../utils/middlewares/chechAllow');

router.get('/', (req, res, next) => {
    controller.getAll()
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.get('/:id', validator(getDocTypeSchema, 'params'), (req, res, next) => {
    const { id } = req.params;
    controller.getOne(id)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.post('/', validator(createDocTypeSchema, 'body'), (req, res, next) => {
    controller.create(req.body)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.patch('/:id', validator(getDocTypeSchema, 'params'), validator(updateDocTypeSchema, 'body'), (req, res, next) => {
    const { id } = req.params;
    controller.update(id, req.body)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.delete('/:id', validator(getDocTypeSchema, 'params'), (req, res, next) => {
    const { id } = req.params;
    controller.remove(id)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

module.exports = router;