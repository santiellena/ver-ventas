const storeUsers = require('../users/store');

const employees = {
    1: {
        id: 1,
        name: 'Administrador',
        lastname: 'Administrador',
        docType: { id: 1, description: 'DNI' },
        numDoc: 21314343,
        dirStreet: 'LOM 123',
        phoneNumber: 32314221,
        email: 'admin@hotmail.com',
        birthDate: '1990-12-05',
        login: 'admin',
        password: 'admin',
    },
    2: {
        id: 2,
        name: 'Aurelio',
        lastname: 'Spencer',
        docType: { id: 1, description: 'DNI' },
        numDoc: 21445355,
        dirStreet: 'Patria 2332',
        phoneNumber: 124456544,
        email: 'mschilli@aol.com',
        birthDate: '1987-04-03',
        login: 'chill',
        password: 'chill1234',
    },
    3: {
        id: 3,
        name: 'Baudelio Teresita',
        lastname: 'Matrone',
        docType: { id: 1, description: 'DNI' },
        numDoc: 1356773,
        dirStreet: 'Patria 443',
        phoneNumber: 993414221,
        email: 'morain@optonline.net',
        birthDate: '1999-09-09',
        login: 'baudelio',
        password: 'tere1234',
    },
    4: {
        id: 4,
        name: 'Felicia',
        lastname: 'Key',
        docType: { id: 1, description: 'DNI' },
        numDoc: 55343322,
        dirStreet: 'Patria 123',
        phoneNumber: 2322314221,
        email: 'mwitte@yahoo.com',
        birthDate: '2000-10-13',
        login: 'felicia',
        password: 'feli1234',
    },
};

function getEmployees () {
    return employees;
};

function newEmplooy ({
    name,
    lastname,
    docType,
    numDoc,
    dirStreet,
    phoneNumber,
    email,
    birthDate,
    login, 
    password,
}) {
    const iterable = Object.entries(getEmployees());
    let newId = 0;
    for (let i = 1; i < iterable.length + 1; i++) {
        if(employees[i] == undefined){
            newId = i;
            break;
        } else if(employees[i+1] == undefined){
            newId = i+1;
            break;
        };
    }; 
    if(name && lastname && docType && numDoc && dirStreet && phoneNumber && email && birthDate && login && password){
        return employees[newId] = {
            id: newId,
            name, 
            lastname,
            docType,
            numDoc,
            dirStreet,
            phoneNumber,
            email,
            birthDate,
            login,
            password,
        };
    };
};

function updateEmplooy ({
    id,
    name,
    lastname,
    docType,
    numDoc,
    dirStreet,
    phoneNumber,
    email,
    birthDate,
    login, 
    password,
}) {
    if(id && name && lastname && docType && numDoc && dirStreet && phoneNumber && email && birthDate && login && password){
        if(employees[id] != undefined){
            if(id == employees[id].id && name == employees[id].name && lastname == employees[id].lastname && docType == employees[id].docType && numDoc == employees[id].numDoc && dirStreet == employees[id].dirStreet && phoneNumber == employees[id].phoneNumber && email == employees[id].email && birthDate == employees[id].birthDate && login == employees[id].login && password == employees[id].password){
                return false;
            } else {
                return employees[id] = {
                    id,
                    name, 
                    lastname,
                    docType,
                    numDoc,
                    dirStreet,
                    phoneNumber,
                    email,
                    birthDate,
                    login, 
                    password,
                };
            };
        } else return null;
    } else return null;
};

function deleteEmplooy (id) {
    if(id && employees[id] != undefined) {
        delete employees[id];
        return id;
    };
};

function getEmplooy (id) {
    if(id && employees[id] != undefined) {
        return employees[id];
    };
};

function checkEmplooyId (id) {
    console.log('STORE EMPLOYEES');
    if(id){
        if(employees[id] != undefined){
            return true;
        } else return false;
    } else return false;
};

function getEmployeesToUser () {
    const users = Object.values(storeUsers.getAllUsers());

    const blackList = users.map(user => {
      return employees[user.idEmplooy];
    });
    const rightList = [];
    Object.values(getEmployees()).map(emplooy => {
        let flag = true;
        for (const user of blackList) {
            if(emplooy.id == user.id){
                flag = false;
            };
        };
        if(flag) rightList.push(emplooy);
    });

    return rightList;
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