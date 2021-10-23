const express = require('express');
const router = require('./network/routes.js');

const db = require('./database/database.js');

const cors = require('cors');

const config = require('./config');
const errors = require('./utils/errors');

//Intializations
const app = express();

//Settings

//Middlewares
app.use(express.json());
app.use(cors());
db();

//Routes
router(app);

//Errors middleware
app.use(errors.wrapErrors);
app.use(errors.errors);

//Start the server
app.listen(config.port, () => {
    console.log(`Server listening ${config.host}:${config.port}`);
});
