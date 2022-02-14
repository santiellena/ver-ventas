const router = require('express').Router();
const response = require('../../network/response');
const controller = require('./controller');
const validator = require('../../utils/middlewares/validator');
const { getDepartmentSchema, updateDepartmentSchema, createDepartmentSchema } = require('../../utils/schemas/department.schema');

router.get('/', (req, res, next) => {
    controller.getAll()
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.get('/:id', validator(getDepartmentSchema, 'params'), (req, res, next) => {
    const { id } = req.params;
    controller.getOne(id)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.post('/', validator(createDepartmentSchema, 'body'), (req, res, next) => {
    controller.create(req.body)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.patch('/:id', validator(getDepartmentSchema, 'params'), validator(updateDepartmentSchema, 'body'), (req, res, next) => {
    const { id } = req.params;
    controller.update(id, req.body)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.delete('/:id', validator(getDepartmentSchema, 'params'), (req, res, next) => {
    const { id } = req.params;
    controller.remove(id)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});


module.exports = router;