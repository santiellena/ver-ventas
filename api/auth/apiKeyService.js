const config = require('../config');
const checkToken = (token) => {
    const publicToken = config.publicToken;

    if(publicToken == token){
        return true;
    } else {
        return false;
    };
};

module.exports = {
    checkToken,
};