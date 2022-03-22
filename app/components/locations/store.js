const config = require('../../config/config');
const axios = require('axios');
const { getUrl }= config;
const { getSessionToken } = require('../../config/auth');

async function getAllLocationsStore () {
    const response = await axios({
        method: 'GET',
        url: `${getUrl()}/api/location/store`,
        headers: {
            authorization: `Bearer ${await getSessionToken()}`,
        },
    });
    if(response.data.message) return null
    else return response.data;
};

async function getLocationStore (id) {
    if(id){
        const response = await axios({
            method: 'GET',
            url: `${getUrl()}/api/location/store/${id}`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,
            },
        });
        if(response.data.message) return null
        else return response.data;
    } else return null;
};

async function getLocationShow (id) {
    const response = await axios({
        method: 'GET',
        url: `${getUrl()}/api/location/exposition/${id}`,
        headers: {
            authorization: `Bearer ${await getSessionToken()}`,
        },
    });
    if(response.data.message) return null
    else return response.data;
};

async function getAllLocationsShow () {
    const response = await axios({
        method: 'GET',
        url: `${getUrl()}/api/location/exposition`,
        headers: {
            authorization: `Bearer ${await getSessionToken()}`,
        },
    });
    if(response.data.message) return null
    else return response.data;
};

module.exports = {
    getAllLocationsShow,
    getAllLocationsStore,
    getLocationShow,
    getLocationStore,
};