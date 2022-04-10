const config = require('../../config/config');
const axios = require('axios');
const fs = require('fs');
const { getSessionToken } = require('../../config/auth');

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

async function getAllDocTypes () {
    const response = await axios({
        method: 'GET',
        url: `${getUrl()}/api/doc-type/`,
        headers: {
            authorization:  `Bearer ${await getSessionToken()}`,
        },
    });
    if(response.data.message) return null
    else return response.data;
};

async function getDocType (id) {
    if(id){
        const response = await axios({
            method: 'GET',
            url: `${getUrl()}/api/doc-type/${id}`,
            headers: {
                authorization:  `Bearer ${await getSessionToken()}`,
            },
        });
        if(response.data.message) return null
        else return response.data;
    } else return null;
};

async function addDocType (newName) {
    if(newName){
        const response = await axios({
            method: 'POST',
            url: `${getUrl()}/api/doc-type/`,
            headers: {
                authorization:  `Bearer ${await getSessionToken()}`,
            },
            data: {
                description: newName,
            },
        });
        if(response.data.message) return null
        else return response.data;
    };
};

async function deleteDocType (id) {
    if(id){
        const response = await axios({
            method: 'DELETE',
            url: `${getUrl()}/api/doc-type/${id}`,
            headers: {
                authorization:  `Bearer ${await getSessionToken()}`,
            },
        });
        if(response.data.message) return null
        else return response.data;
    } else return null;
};

module.exports = {
    getAllDocTypes,
    getDocType,
    addDocType,
    deleteDocType,
};