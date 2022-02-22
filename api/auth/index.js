const jwt = require('jsonwebtoken');

const config = require('../config');
const secret = config.jwt.secret;

const boom = require('@hapi/boom');

const sign = (data) => {
    
    return jwt.sign(data, secret, {});
};

const verify = (token) => {
        
        return jwt.verify(token, secret);
}

const check = {
    own: (req, owner) => {
        const decoded = decodeHeader(req);
        if(decoded.id !== owner){

            throw boom.unauthorized('Access denied');
        };
        return true;
    },

}

const getToken = (auth) => {
    if(!auth){
        throw boom.unauthorized('There is not TOKEN');
    }
    if(auth.indexOf('Bearer ', '') == -1){
        throw boom.unauthorized('Incorrect TOKEN information');
    }

    let token = auth.replace('Bearer ', '');
    
    return token;
};

const decodeHeader = (req) => {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);
    req.user = decoded;
    return decoded;
};

module.exports = {
    sign,
    check,
    decodeHeader,
};