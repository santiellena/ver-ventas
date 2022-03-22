const config = require('../../config/config');
const axios = require('axios');
const { getUrl }= config;
const { getSessionToken } = require('../../config/auth');
const dates = require('../../config/date');

async function getAllUserTypes () {
    const response = await axios({
        method: 'GET',
        url: `${getUrl()}/api/user-type`,
        headers: {
            authorization: `Bearer ${await getSessionToken()}`,
        },
    });
    if(response.data.message) return null
    else return response.data;
};

async function getUserType (id) {
    if(id && userTypes[id] != undefined){
        const response = await axios({
            method: 'GET',
            url: `${getUrl()}/api/user-type/${id}`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,
            },
        });
        if(response.data.message) return null
        else return response.data;
    } else return null;
};

async function getEmplooyType () {
    const emplooyType = await getAllUserTypes(2);
    return emplooyType;
};

async function getAllUsers () {
    const response = await axios({
        method: 'GET',
        url: `${getUrl()}/api/auth/`,
        headers: {
            authorization: `Bearer ${await getSessionToken()}`,
        },
    });
    if(response.data.message) return null
    else return response.data;
};

async function getUser (id) {
    if(id) {
        const response = await axios({
            method: 'GET',
            url: `${getUrl()}/api/auth/${id}`,
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,
            },
        });
        if(response.data.message) return null
        else return response.data;
    } else return null;
};

async function checkUserTypeId (id) {
    const type = await getUserType(id);
    if(type) return true
    else return false;
};

async function addUser ({
    idEmplooy,
    idUserType,
    username,
    password,
    branches,
    menuStock,
    menuBuys, 
    menuSells,
    menuMaintenance,
    menuQuery,
    menuAdmin,
    menuInvoicing,
}) {
    if(checkUserTypeId(idUserType) == false){
        return null;
    };
    const registerDate = dates.actualDateAccuracy();
    if(branches && idEmplooy && idUserType && menuStock != null && menuBuys != null && menuSells != null && menuMaintenance != null && menuQuery != null && menuAdmin != null && menuInvoicing != null && password && username){
        const response = await axios({
            method: 'POST',
            url: `${getUrl()}/api/auth`,
            data: {
                idEmplooy,
                idUserType: 2,
                username,
                password,
                branches,
                menuStock,
                menuBuys, 
                menuSells,
                menuMaintenance,
                menuQuery,
                menuAdmin,
                menuInvoicing,
            },
            headers: {
                authorization: `Bearer ${await getSessionToken()}`,
            },
        });
        if(response.data.message) return null
        else return response.data;
    } else return null;
};

async function updateUser ({
    id,
    menuStock,
    menuBuys, 
    menuSells,
    menuMaintenance,
    menuQuery,
    menuAdmin,
    menuInvoicing,
    menuStats,
    username,
    password,
    branches,
}) {
    if(id &&
        username &&
        branches &&
        password &&
        menuStock != null &&
        menuAdmin != null &&
        menuBuys != null &&
        menuMaintenance != null &&
        menuSells != null &&
        menuInvoicing != null &&
        menuStats != null && menuQuery != null){
            const response = await axios({
                method: 'PATCH',
                url: `${getUrl()}/api/auth/${id}`,
                data: {
                    username,
                    password,
                    branches,
                    menuStock,
                    menuBuys, 
                    menuSells,
                    menuMaintenance,
                    menuQuery,
                    menuAdmin,
                    menuInvoicing,
                },
                headers: {
                    authorization: `Bearer ${await getSessionToken()}`,
                },
            });
            if(response.data.message) return null
            else return response.data;
                            
    } else return null;
};

async function getPermissions (idUser) {
    const response = await getUser(idUser);
    if(response){
        const permissions = {
            menuStock: response.menuStock,
            menuBuys: response.menuBuys, 
            menuSells: response.menuSells,
            menuMaintenance: response.menuMaintenance,
            menuQuery: response.menuQuery,
            menuAdmin: response.menuAdmin,
            menuInvoicing: response.menuInvoicing,
        };

        return permissions;
    } else return null;
};

async function deleteUser (idUser) {
    const response = await axios({
        method: 'DELETE',
        url: `${getUrl()}/api/auth/${id}`,
        headers: {
            authorization: `Bearer ${await getSessionToken()}`,
        },
    });
    if(response.data.message) return null
    else return response.data;
};

module.exports = {
    getAllUserTypes,
    getUserType,
    getAllUsers,
    getPermissions,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    getEmplooyType,
};