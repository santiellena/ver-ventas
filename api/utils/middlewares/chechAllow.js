const auth = require('../../auth/index');
const boom = require('@hapi/boom');

const checkAllow = (action) => {
    const middleware = async (req, res, next) => {
        const user = auth.decodeHeader(req);
        if(!user || (user && !user.scopes)) {
            next(boom.unauthorized('Missing scopes'));
        }

        const hasAccess = action
        .map(ACTION => user.scopes.includes(ACTION))
        .find(allowed => Boolean(allowed));
    
        if(hasAccess) {

        next();
        }else {

        next(boom.unauthorized('Access denied'));
        };
    };
    return middleware;
};

module.exports = checkAllow;