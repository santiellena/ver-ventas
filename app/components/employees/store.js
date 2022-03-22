const dates = require('../../config/date');
const config = require('../../config/config');
const axios = require('axios');
const { getSessionToken } = require('../../config/auth');

const fs = require('fs');

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

const storeUsers = require('../users/store');

async function getEmployees () {
    const response = await axios({
        method: 'GET',
        url: `${getUrl()}/api/emplooy`,
        headers: {
            authorization: `Bearer ${await getSessionToken()}`,
        },
    });
    if(response.data.message) return null
    else return response.data;
};

async function getEmplooy (id) {
    if(id) {
        const response = await axios({
            method: 'GET',
            url: `${getUrl()}/api/emplooy/${id}`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,
            },
        });
        if(response.data.message) return null
        else return response.data;
    } else return null;
};

async function newEmplooy ({
    name,
    lastname,
    docType,
    numDoc,
    dirStreet,
    phoneNumber,
    email,
    birthDate,
}) {
    if(name && lastname && docType && numDoc && dirStreet && phoneNumber && email && birthDate){
        const response = await axios({
            method: 'POST',
            url: `${getUrl()}/api/emplooy`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,
            },
            data: {
                name, 
                lastname,
                idDocType: docType,
                numDoc,
                dirStreet,
                phoneNumber,
                email,
                birthDate,
            },
        });
        if(response.data.message) return null
        else return response.data;
    } else return null;
};

async function updateEmplooy ({
    id,
    name,
    lastname,
    docType,
    numDoc,
    dirStreet,
    phoneNumber,
    email,
    birthDate,
}) {
    if(id && name && lastname && docType && numDoc && dirStreet && phoneNumber && email && birthDate ){
                const response = await axios({
                    method: 'PATCH',
                    url: `${getUrl()}/api/emplooy/${id}`,
                    headers: {
                        authorization: `Bearer ${await getSessionToken()}`,
                    },
                    data: {
                        name, 
                        lastname,
                        idDocType: docType,
                        numDoc,
                        dirStreet,
                        phoneNumber,
                        email,
                        birthDate,
                    },
                });
                if(response.data.message) return null
                else return response.data;
    } else return null;
};

async function deleteEmplooy (id) {
    if(id) {
        const response = await axios({
            method: 'DELETE',
            url: `${getUrl()}/api/emplooy/${id}`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,
            },
        });
        if(response.data.message) return null
        else return response.data;
    } else return null;
};

async function checkEmplooyId (id) {
    if(id){
        const emplooy = await getEmplooy(id);
        if(emplooy) return true
        else return false;
    } else return false;
};

async function getEmployeesToUser () {
    const users = await storeUsers.getAllUsers();

    const blackList = users.map(async user => {
      return await getEmplooy(user.idEmplooy);
    });
    const employees = await getEmployees();
    if(employees){
        const rightList = employees.map(emplooy => {
            let flag = true;
            for (const user of blackList) {
                if(emplooy.id == user.id){
                    flag = false;
                };
            };
            if(flag) return emplooy;
        });
    
        return rightList;
    };
};

module.exports = {
    getEmployees,
    getEmplooy,
    newEmplooy,
    updateEmplooy,
    deleteEmplooy,
    checkEmplooyId,
    getEmployeesToUser,
};