const express = require('express');
const router = express.Router();

const controller = require('./controller');
const response = require('../../network/response');
const checkAllow = require('../../utils/middlewares/chechAllow');

router.get('/', checkAllow(['menu-maintenance']), (req, res, next) => {
    controller.dump()
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

module.exports = router;