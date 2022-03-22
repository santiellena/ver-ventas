const config = require('../../config/config');
const axios = require('axios');
const { getUrl }= config;
const { getSessionToken } = require('../../config/auth');

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