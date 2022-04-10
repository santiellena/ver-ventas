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

async function createLocationStore (description) {
    const response = await axios({
        method: 'POST',
        url: `${getUrl()}/api/location/store`,
        headers: {
            authorization: `Bearer ${await getSessionToken()}`,
        },
        data: {
            description,
            idBranch: config.getBranchDataFromConfig().id,
        },
    });
    if(response.data.message) return null
    else return response.data;
};

async function createLocationExposition (description) {
    const response = await axios({
        method: 'POST',
        url: `${getUrl()}/api/location/exposition`,
        headers: {
            authorization: `Bearer ${await getSessionToken()}`,
        },
        data: {
            description,
            idBranch: config.getBranchDataFromConfig().id,
        },
    });
    if(response.data.message) return null
    else return response.data;
};

async function deleteLocationExposition (id) {
    const response = await axios({
        method: 'DELETE',
        url: `${getUrl()}/api/location/expostion/${id}`,
        headers: {
            authorization: `Bearer ${await getSessionToken()}`,
        },
    });
    if(response.data.message) return null
    else return response.data;
};

async function deleteLocationStore (id) {
    const response = await axios({
        method: 'DELETE',
        url: `${getUrl()}/api/location/store/${id}`,
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
    createLocationExposition,
    createLocationStore,
    deleteLocationExposition,
    deleteLocationStore,
};