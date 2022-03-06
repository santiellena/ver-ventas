const response = require('../network/response.js');
const boom = require('@hapi/boom');
const config = require('../config');

const { ValidationError } = require('sequelize')

function withErrorStack(error, stack) {
    if (config.mode == 'DEV') {
      return { ...error, stack };
    }
    return error;
  }
const wrapErrors = (err, req, res, next) => {
    if(!err.isBoom){
        next(boom.badImplementation(err));
    }

    next(err);
};

const errors = (err, req, res, next) => {
    const { output: {statusCode, payload} } = err;
    const message = withErrorStack(payload, err.stack);
    response.error(req, res, message, 200);
};

const notFound = (req, res) => {
    const { output: { statusCode, payload }
    } = boom.notFound();
  
    response.error(req, res, {payload, message: {statusCode,}}, 200);
};

function ormErrorHandler(err, req, res, next) {
    if (err instanceof ValidationError) {
        const message = {
            message: err.name,
            errors: err.errors,
            statusCode: 409,
        };
        response.error(req, res, {message}, 200);
    }
    next(err);
}

module.exports = {
    errors,
    wrapErrors,
    notFound,
    ormErrorHandler,
}