const { session } = require('electron');
const { getUrl } = require('./config');

async function getSessionToken () {
    const ses = session.defaultSession;
    const token = await ses.cookies.get({url: getUrl(), name: 'token'});
    return token[0].value;
};

async function publicToken () {
    return '4739319abf9070ef0b0e2a73224820ae70488aa6';
};
module.exports = {
    getSessionToken,
    publicToken,
};
