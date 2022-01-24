const storeEmployees = require('../employees/store');

const userTypes = {
    1: {
        id: 1,
        description: 'Administrador',
    },
    2: {
        id: 2,
        description: 'Empleado',
    },
};

const users = {
    1: {
        id: 1,
        idEmplooy: 1,
        idUserType: 1,
        branches: [1, 2],
        registerDate: '',
        menuStock: 1,
        menuBuys: 1,
        menuSells: 1,
        menuMaintenance: 1,
        menuQuery: 1,
        menuAdmin: 1,
        menuInvoicing: 1,
    },
    2: {
        id: 2,
        idEmplooy: 2,
        idUserType: 2,
        branches: [1],
        registerDate: '',
        menuStock: 1,
        menuBuys: 1,
        menuSells: 1,
        menuMaintenance: 1,
        menuQuery: 1,
        menuAdmin: 0,
        menuInvoicing: 1,
    },
};

function getAllUserTypes () {
    return userTypes;
};

function getUserType (id) {
    if(id && userTypes[id] != undefined){
        return userTypes[id];
    };
};

function getEmplooyType () {
    const userTypes = Object.values(getAllUserTypes());
    for (const type of userTypes) {
        if (type.description == 'Empleado') return type;  
    };
};

function getAllUsers () {
    return users;
};

function getUser (id) {
    if(id && users[id] != undefined) {
        return users[id];
    };
};

function checkUserTypeId (id) {
    if(id){
        if(userTypes[id] != undefined){
            return true;
        } else return false;
    } else return false;
};

function addUser ({
    idEmplooy,
    idUserType,
    branches,
    menuStock,
    menuBuys, 
    menuSells,
    menuMaintenance,
    menuQuery,
    menuAdmin,
    menuInvoicing,
}) {
    const iterable = Object.entries(users);
    let newId = 0;
    for (let i = 1; i < iterable.length + 1; i++) {
        if(users[i] == undefined){
            newId = i;
            break;
        } else if(users[i+1] == undefined){
            newId = i+1;
            break;
        };
    };

    if(checkUserTypeId(idUserType) == false){
        return null;
    };
    const actualDate = new Date();
    const registerDate = `${actualDate.getFullYear()}/${actualDate.getMonth()+1}/${actualDate.getDate()}-${actualDate.getHours()}:${actualDate.getMinutes()}`;
    if(branches && idEmplooy && idUserType && menuStock != null && menuBuys != null && menuSells != null && menuMaintenance != null && menuQuery != null && menuAdmin != null && menuInvoicing != null){
        if(users[newId] == undefined){
            return users[newId] = {
                id: newId,
                idEmplooy,
                branches,
                idUserType,
                registerDate,
                menuStock,
                menuBuys,
                menuSells,
                menuMaintenance,
                menuQuery,
                menuAdmin,
                menuInvoicing,
            };
        } else return null;
    } else return null;
};

function updateUser ({
    id,
    menuStock,
    menuBuys, 
    menuSells,
    menuMaintenance,
    menuQuery,
    menuAdmin,
    menuInvoicing,
}) {
    if(id && menuStock && menuBuys && menuSells && menuMaintenance && menuQuery && menuAdmin && menuInvoicing){
        if(users[id] != undefined) {
            if(menuStock == users[id].menuStock && menuBuys == users[id].menuBuys && menuSells == users[id].menuSells && menuMaintenance == users[id].menuMaintenance && menuQuery == users[id].menuQuery && menuAdmin == users[id].menuAdmin && menuInvoicing == users[id].menuInvoicing){
                return false;
            } else {
                return users[id] = {
                    id,
                    idEmplooy: users[id].idEmplooy,
                    idUserType: users[id].idUserType,
                    branches: users[id].branches,
                    menuStock,
                    menuBuys,
                    menuSells,
                    menuMaintenance,
                    menuQuery,
                    menuAdmin,
                    menuInvoicing,
                };
            };
        } else return null;
    } else return null;
};

function getPermissions (idUser) {
    if(users[idUser] != undefined){
        const permissions = {
            menuStock: users[idUser].menuStock,
            menuBuys: users[idUser].menuBuys,
            menuSells: users[idUser].menuSells,
            menuMaintenance: users[idUser].menuMaintenance,
            menuQuery: users[idUser].menuQuery,
            menuAdmin: users[idUser].menuAdmin,
            menuInvoicing: users[idUser].menuInvoicing,
        };
        
        return permissions;
    };
};

function deleteUser (idUser) {
    if(users[idUser] != undefined){
        delete users[idUser];
    };
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