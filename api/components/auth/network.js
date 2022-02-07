const express = require('express');
const router = express.Router();

const controller = require('./controller');
const response = require('../../network/response');

router.get('/', (req, res) => {

    res.send('Hola from auth');
});

module.exports = router;