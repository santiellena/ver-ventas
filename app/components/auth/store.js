const fs = require('fs');
const axios = require('axios');

const network = fs.readFileSync(`${__dirname}/../../config/network.json`, {encoding: 'utf-8'}, (err, data) => {
    if(err) {
        throw new Error(err);
    } else {
        return JSON.parse(data);
    };
});

function getUrl () {
    const net = JSON.parse(network);
    return net.url;
};

async function login (username, password) {
    const token = await axios({
        method: 'GET',
        url: `${getUrl()}/api/auth/login`,
        data: {
            username,
            password,
            token: '4739319abf9070ef0b0e2a73224820ae70488aa6',
        },
    });
    return token;
};

async function getUserData(token) {
            const response = await axios({
                url: `${getUrl()}/api/auth/data/user`,
                headers: {
                    authorization: `Bearer ${token}`,   
                },
                data: {
                    token,
                },
            });
            return response;
};

module.exports = {
    login,
    getUserData,
};