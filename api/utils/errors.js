const response = require('../network/response.js');
const boom = require('@hapi/boom');
const config = require('../config');

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
    response.error(req, res, message, statusCode);
};

const notFound = (req, res) => {
    const { output: { statusCode, payload }
    } = boom.notFound();
  
    response.error(req, res, payload, statusCode);
};

module.exports = {
    errors,
    wrapErrors,
    notFound,
}