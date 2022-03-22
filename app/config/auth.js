const { session } = require('electron');
const fs = require('fs')

function getUrl () {
    const network = fs.readFileSync(`${__dirname}/network.json`, {encoding: 'utf-8'}, (err, data) => {
        if(err) {
            throw new Error(err);
        } else {
            return JSON.parse(data);
        };
    });
    const net = JSON.parse(network);
    return net.url;
};

async function getSessionToken () {
    const ses = session.defaultSession;
    const token = await ses.cookies.get({url: getUrl(), name: 'token'});
    return token[0].value;
};

async function publicToken () {
    return '4739319abf9070ef0b0e2a73224820ae70488aa6';
};

async function getUserSessionInfo() {
    const ses = session.defaultSession;
    const info = await ses.cookies.get({url: getUrl(), name: 'token'});
    const userData = await auth.getUserData(info[0].value);
    if(!userData){
        return null;
    } else if(userData.data.message){
        return null;
    } else {
        userData.data.name = userData.data.emplooy.name;
        return userData.data;
    };
};

module.exports = {
    getSessionToken,
    publicToken,
    getUserSessionInfo,
};
