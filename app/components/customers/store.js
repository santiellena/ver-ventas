const config = require("../../config/config.js");
const axios = require("axios");
const { getSessionToken } = require("../../config/auth");
const dates = require('../../config/date');
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

async function getAllCustomers () {
    const response = await axios({
        method: 'GET',
        url: `${getUrl()}/api/customer`,
        headers: {
            authorization: `Bearer ${await getSessionToken()}`,
        },
    });
    if(response.data.message) return null
    else return response.data;
};

async function getCustomer (id) {
    if(id){
        const response = await axios({
            method: 'GET',
            url: `${getUrl()}/api/customer/${id}`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,
            },
        });
        if(response.data.message) return null
        else return response.data;
    } else return null;
};

async function addToDebt (id, debt) {
    if(id && debt){
        const customer = await getCustomer(id);
        if(customer){
            const resultNewDebts = parseFloat(customer.debts) + parseFloat(debt);
            const toParseNumber = resultNewDebts.toFixed(2);
            const readyNumber = parseFloat(toParseNumber);

            const response = await axios({
                method: 'PATCH',
                url: `${getUrl()}/api/customer/${id}`,
                headers: {
                    authorization: `Bearer ${await getSessionToken()}`,
                },
                data: {
                    debt: readyNumber,
                },
            });
            if(response.data.message) return null
            else return response.data;
        } else return null;
    } else return null;
};

async function getFreeFirstIndex () {
    const iterableObject = await getAllCustomers();
    const lastCustomer = iterableObject[iterableObject.lenght - 1];
    const newId = lastCustomer.id + 1;

    return newId;
};

async function checkExistance (id) {
    if(await getCustomer(id)) return true;
    else return false;
};

async function addCustomer ({
    id, 
    name,
    docType,
    numDoc,
    cuit,
    email,
    phoneNumber,
    dirProv,
    dirDepto,
    postCode,
    dirCity,
    street,
    initialDebt,
}) {
        const codePostInt = parseInt(postCode);
        const initialDebtFloat = parseFloat(initialDebt);

        const response = await axios({
            method: 'POST',
            url: `${getUrl()}/api/customer`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,
            },
            data: {
                name,
                idDocType: docType,
                numDoc,
                cuit,
                email,
                phoneNumber,
                idDirProvince: dirProv.id,
                idDirDeptartment: dirDepto.id,
                dirPostCode: codePostInt,
                idDirCity: dirCity.id,
                dirStreet: street,
                debt: initialDebtFloat,
            },
        });
        if(response.data.message) return null
        else return response.data;
};

async function editCustomer ({
    id,
    name,
    docType,
    numDoc,
    cuit,
    email,
    phoneNumber, 
    dirProv,
    dirDepto,
    dirPostCode,
    dirCity,
    dirStreet,
    debt,
}) {
    const response = await axios({
        method: 'POST',
        url: `${getUrl()}/api/customer/${id}`,
        headers: {
            authorization: `Bearer ${await getSessionToken()}`,
        },
        data: {
            name,
            idDocType: docType,
            numDoc,
            cuit,
            email,
            phoneNumber,
            idDirProvince: dirProv.id,
            idDirDeptartment: dirDepto.id,
            dirPostCode,
            idDirCity: dirCity.id,
            dirStreet,
            debt,
        },
    });
    if(response.data.message) return null
    else return response.data;
        
};

async function deleteCustomer (id) {
    if(id){
        const response = await axios({
            method: 'DELETE',
            url: `${getUrl()}/api/customer/${id}`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,
            },
        });
        if(response.data.message) return null
        else return response.data;
    } else return null;
};

async function removeFromDebts (idCustomer, amount) {
    const amountToFloat = parseFloat(amount);
    const customer = await getCustomer(idCustomer);
    if(customer){
        customer.debt = customer.debt - amountToFloat;

        const response = await axios({
                    method: 'PATCH',
                    url: `${getUrl()}/api/customer/${id}`,
                    headers: {
                        authorization: `Bearer ${await getSessionToken()}`,
                    },
                    data: {
                        debt: customer.debt,
                    },
                });
                if(response.data.message) return null
                else return response.data;
    } else return null;
}; 

module.exports = {
    getAllCustomers,
    getCustomer,
    addToDebt,
    getFreeFirstIndex,
    checkExistance,
    addCustomer,
    editCustomer,
    deleteCustomer,
    removeFromDebts,
};