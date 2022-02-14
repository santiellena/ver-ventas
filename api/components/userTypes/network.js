const express = require('express');
const router = express.Router();

const controller = require('./controller');
const response = require('../../network/response');
const checkAllow = require('../../utils/middlewares/chechAllow');
const validator = require('../../utils/middlewares/validator');
const { getUserTypeSchema, createUserTypeSchema, updateUserTypeSchema } = require('../../utils/schemas/userType.schema');

router.get('/', (req, res, next) => {
    controller.getAll()
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.get('/:id', validator(getUserTypeSchema, 'params'), (req, res, next) => {
    const { id } = req.params;

    controller.getOne(id)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.post('/', validator(createUserTypeSchema, 'body'), (req, res, next) => {
    controller.create(req.body)
    .then(data => response.success(req, res, data, 201))
    .catch(err => next(err));
});

router.patch('/:id', validator(getUserTypeSchema, 'paramas'), validator(updateUserTypeSchema, 'body'), (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;
    controller.update(id, changes)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.delete('/:id', validator(getUserTypeSchema, 'params'), (req, res, next) => {
    const { id } = req.params;   
    controller.remove(id)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

module.exports = router;