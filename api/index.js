const express = require('express');
const router = require('./network/routes.js');

const db = require('./database/database.js');

const cors = require('cors');

const config = require('./config');
const errors = require('./utils/errors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUiExpress = require('swagger-ui-express');

//Intializations
const app = express();

//Settings
const swaggerOptions = {
    definition: {
        info: {
            title: 'VerSystem API',
            description: 'API conectada a base de datos para permitir hacer consultas desde la app desktop',
            contact: {
                name: "ESanti",
                email: "santiellenacm@gmail.com",
            },
            servers: [`http://${config.host}:${config.port}`],
        },
    },
    apis: ['./components/*/network.js'],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);


//Middlewares
app.use(express.json());
app.use(cors());
db();

//Routes
router(app);
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocs));

//Errors middleware
app.use(errors.wrapErrors);
app.use(errors.errors);

//Start the server
app.listen(config.port, () => {
    console.log(`Server listening ${config.host}:${config.port}`);
});
