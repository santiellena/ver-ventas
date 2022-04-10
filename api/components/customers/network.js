const router = require('express').Router();
const response = require('../../network/response');
const validator = require('../../utils/middlewares/validator');
const controller = require('./controller');
const { getPeopleSchema, updatePeopleSchema, deletePeopleSchema, createCustomerSchema } = require('../../utils/schemas/people.schema');
const checkAllow = require('../../utils/middlewares/chechAllow');

router.get('/', (req, res, next) => {
    controller.getAll()
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err)); 
});

router.get('/:id', validator(getPeopleSchema, 'params'), (req, res, next) => {
    const { id } = req.params;
    controller.getOne(id)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err)); 
});

router.get('/sells/:id', validator(getPeopleSchema, 'params'), (req, res, next) => {
    const { id } = req.params;
    controller.getOneWithSells(id)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err)); 
});

router.post('/', validator(createCustomerSchema, 'body'), (req, res, next) => {
    controller.create(req.body)
    .then(data => response.success(req, res, data, 200))
    .catch(err => console.log(err)); 
});

router.patch('/:id', validator(getPeopleSchema, 'params'), validator(updatePeopleSchema, 'body'), (req, res, next) => {
    const { id } = req.params;
    controller.update(id, req.body)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err)); 
});

router.delete('/:id', validator(deletePeopleSchema, 'params'), (req, res, next) => {
    const { id } = req.params;
    controller.remove(id)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));  
});

module.exports = router;