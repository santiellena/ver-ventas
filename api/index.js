const express = require('express');
const router = require('./network/routes.js');
const controllerGlobal = require('./components/global/controller');
const response = require('./network/response');

const db = require('./database/database.js');

const cors = require('cors');

const config = require('./config');
const errors = require('./utils/errors');

//Intializations
const app = express();

//Middlewares
app.use(express.json());
app.use(cors());
db.connect();

app.get('/api', (req, res, next) => {
    controllerGlobal.getFirstTimeInfo()
    .then(data => response.success(req, res, data, 200))
    .catch(err => next(err));
});

app.get('/api/token/:token', (req, res, next) => {
    const { token } = req.params;
    if(config.publicToken == token){
        response.success(req, res, {message: 'RIGHT'}, 200);
    } else {
        response.error(req, res, null, 400);
    };
});

//Routes
router(app);

//Errors middleware
app.use(errors.ormErrorHandler);
app.use(errors.wrapErrors);
app.use(errors.errors);

//Start the server
app.listen(config.port, () => {
    console.log(`Server listening ${config.host}:${config.port}`);
});
