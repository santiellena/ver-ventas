const express = require('express');
const router = express.Router();

const controller = require('./controller');
const response = require('../../network/response');
const validator = require('../../utils/middlewares/validator');
const { getUserSchema, updateUserSchema, createUserSchema } = require('../../utils/schemas/user.schema');
const { loginSchema } = require('../../utils/schemas/auth.schema');
const checkAllow = require('../../utils/middlewares/chechAllow');


router.get('/login', validator(loginSchema, 'body'), (req, res, next) => {
    const { username, password, token, apiKeyToken } = req.body;
    controller.login(username, password, token, apiKeyToken)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.get('/', checkAllow(['menu-maintenance']) ,(req, res, next) => {
    controller.getAll()
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.get('/:id', validator(getUserSchema, 'params'), (req, res, next) => {
    const { id } = req.params;
    controller.getOne(id)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.post('/', validator(createUserSchema, 'body'), (req, res, next) => {
    controller.create(req.body)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.patch('/:id', validator(getUserSchema, 'params'), validator(updateUserSchema, 'body'), (req, res, next) => {
    const { id } = req.params;
    controller.update(id, req.body)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.delete('/:id', validator(getUserSchema, 'params'), (req, res, next) => {
    const { id } = req.params;
    controller.remove(id)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

module.exports = router;