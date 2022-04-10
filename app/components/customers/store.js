const config = require("../../config/config.js");
const axios = require("axios");
const { getSessionToken } = require("../../config/auth");
const dates = require('../../config/date');
const fs = require('fs');

const storeDirections = require('../directions/store');
const storeDocType = require('../docTypes/store');

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
    else {
        const customers = response.data;
        for (const customer of customers) {
            customer.docType = await storeDocType.getDocType(customer.person.idDocType);
            customer.name = customer.person.name;
            customer.numDoc = customer.person.numDoc;
            customer.email = customer.person.email;
            customer.phoneNumber = customer.person.phoneNumber;
            customer.dirDepartment = storeDirections.getDepartment(customer.person.idDirDepartment);
            customer.dirProvince = storeDirections.getProvince(customer.person.idDirProvince);
            customer.dirCity = storeDirections.getCity(customer.person.idDirCity);
            customer.dirPostCode = customer.person.dirPostCode;
            customer.dirStreet = customer.person.dirStreet;
            customer.cuit = customer.person.cuit;
        };
        return customers;
    };
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
        else {
            const customer = response.data;
            customer.docType = await storeDocType.getDocType(customer.person.idDocType);;
            customer.name = customer.person.name;
            customer.numDoc = customer.person.numDoc;
            customer.email = customer.person.email;
            customer.phoneNumber = customer.person.phoneNumber;
            customer.dirDepartment = storeDirections.getDepartment(customer.person.idDirDepartment);
            customer.dirProvince = storeDirections.getProvince(customer.person.idDirProvince);
            customer.dirCity = storeDirections.getCity(customer.person.idDirCity);
            customer.dirPostCode = customer.person.dirPostCode;
            customer.dirStreet = customer.person.dirStreet;
            customer.cuit = customer.person.cuit;
            return customer;
        };
    } else return null;
};

async function getCustomerWithSells (id) {
    if(id){
        const response = await axios({
            method: 'GET',
            url: `${getUrl()}/api/customer/sells/${id}`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,
            },
        });
        if(response.data.message) return null
        else {
            const customer = response.data;
            customer.docType = await storeDocType.getDocType(customer.person.idDocType);;
            customer.name = customer.person.name;
            customer.numDoc = customer.person.numDoc;
            customer.email = customer.person.email;
            customer.phoneNumber = customer.person.phoneNumber;
            customer.dirDepartment = storeDirections.getDepartment(customer.person.idDirDepartment);
            customer.dirProvince = storeDirections.getProvince(customer.person.idDirProvince);
            customer.dirCity = storeDirections.getCity(customer.person.idDirCity);
            customer.dirPostCode = customer.person.dirPostCode;
            customer.dirStreet = customer.person.dirStreet;
            customer.cuit = customer.person.cuit;
            return customer;
        };
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

async function addCustomer ({
    name,
    idDocType,
    numDoc,
    cuit,
    email,
    phoneNumber,
    idDirProvince,
    idDirDepartment,
    dirPostCode,
    idDirCity,
    dirStreet,
    initialDebt,
}) {
        const codePostInt = parseInt(dirPostCode);
        const debt = parseFloat(initialDebt);

        const response = await axios({
            method: 'POST',
            url: `${getUrl()}/api/customer`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,
            },
            data: {
                name,
                idDocType,
                numDoc,
                cuit,
                email,
                phoneNumber,
                idDirProvince,
                idDirDepartment,
                dirPostCode: codePostInt,
                idDirCity,
                dirStreet,
                debt,
            },
        });
        if(response.data.message) return null
        else return await getCustomer(response.data.id);
};

async function editCustomer ({
    id,
    name,
    idDocType,
    numDoc,
    cuit,
    email,
    phoneNumber,
    idDirProvince,
    idDirDepartment,
    dirPostCode,
    idDirCity,
    dirStreet,
    debt
}) {
    const response = await axios({
        method: 'PATCH',
        url: `${getUrl()}/api/customer/${id}`,
        headers: {
            authorization: `Bearer ${await getSessionToken()}`,
        },
        data: {
            name,
            idDocType,
            numDoc,
            cuit,
            email,
            phoneNumber,
            idDirProvince,
            idDirDepartment,
            dirPostCode,
            idDirCity,
            dirStreet,
            debt,
        },
    });
    if(response.data.message) return null
    else return await getCustomer(response.data.id);
        
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

module.exports = {
    getAllCustomers,
    getCustomer,
    getCustomerWithSells,
    addToDebt,
    addCustomer,
    editCustomer,
    deleteCustomer,
    removeFromDebts,
    getFreeFirstIndex,
    checkExistance,
};