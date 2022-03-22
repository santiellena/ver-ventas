const config = require("../../config/config.js");
const axios = require("axios");
const { getUrl } = config;
const { getSessionToken } = require("../../config/auth");

async function getAllDepartments () {
    const response = await axios({
        method: 'GET',
        url: `${getUrl()}/api/department/`,
        headers: {
            authorization: `Bearer ${await getSessionToken()}`,
        },
    });
    if(response.data.message) return null
    else return response.data;
};

async function getDepartment(id){
    const response = await axios({
        method: 'GET',
        url: `${getUrl()}/api/department/${id}`,
        headers: {
            authorization: `Bearer ${await getSessionToken()}`,
        },
    });
    if(response.data.message) return null
    else return response.data;
};

async function addDepartment (description) {
    if(description){
        const response = await axios({
            method: 'POST',
            url: `${getUrl()}/api/department/`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,
            },
            data: {
                description,
            },
        });
        if(response.data.message) return null
        else return response.data;
    } else return null;
};

async function deleteDepartment (id) {
    const response = await axios({
        method: 'DELETE',
        url: `${getUrl()}/api/department/${id}`,
        headers: {
            authorization: `Bearer ${await getSessionToken()}`,
        },
    });
    if(response.data.message) return null
    else return response.data;
}

module.exports = {
    getAllDepartments,
    getDepartment,
    addDepartment,
    deleteDepartment,
};