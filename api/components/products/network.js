const router = require('express').Router();
const response = require('../../network/response');
const validator = require('../../utils/middlewares/validator');
const { getProductSchema, getLast7Schema, createProductSchema, updateProductSchema, deleteProductSchema, updateByDetailSchema } = require('../../utils/schemas/product.schema');
const controller = require('./controller');
const checkAllow = require('../../utils/middlewares/chechAllow');

router.get('/', checkAllow(['menu-stock']), (req, res, next) => {
    controller.getAll()
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.get('/last', checkAllow(['menu-stock']), validator(getLast7Schema, 'query'), (req, res, next) => {
    const { offset } = req.query;
    controller.getLast7(offset)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.get('/missing/', checkAllow(['menu-stock']), (req, res, next) => {
    controller.getMissing()
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.get('/:id', validator(getProductSchema, 'params'), checkAllow(['menu-stock']), (req, res, next) => {
    const { id } = req.params;
    controller.getOne(id)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.get('/description/:description', checkAllow(['menu-sells']), (req, res, next) => {
    const { description } = req.params;

    controller.getByDescription(description)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.get('/ids/:id', checkAllow(['menu-sells']), (req, res, next) => {
    const { id } = req.params;

    controller.getById(id)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});


router.post('/', validator(createProductSchema, 'body'), checkAllow(['menu-stock']), (req, res, next) => {
    controller.create(req.body)
    .then(data => response.success(req, res, data, 201))
    .catch(err => next(err));
});

router.patch('/:id', checkAllow(['menu-stock']), validator(getProductSchema, 'params'), validator(updateProductSchema, 'body'), (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;
    controller.update(id, changes)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.patch('/buy/new', checkAllow(['menu-stock']), validator(updateByDetailSchema, 'body'), (req, res, next) => {
    const { details } = req.body;
    controller.updateByDetail(details)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.put('/sale/:id', checkAllow(['menu-stock']), validator(getProductSchema, 'params'), (req, res, next) => {
    const { id } = req.params;      
    controller.updateOnSale(id)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.put('/sell/:id', checkAllow(['menu-stock']), validator(getProductSchema, 'params'), (req, res, next) => {
    const { id } = req.params;
    const { minus } = req.query;
    controller.updateFromSell(id, minus)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

router.delete('/:id', checkAllow(['menu-stock']), validator(deleteProductSchema, 'params'), (req, res, next) => {
    const { id } = req.params;   
    controller.remove(id)
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});
module.exports = router;