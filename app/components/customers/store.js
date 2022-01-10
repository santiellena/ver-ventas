const customers = {
    1: {
        id: 1,
        name: 'Jorge Lintos',
        numDoc: 34555123,
        docType: {id: 1, description: 'DNI'},
        email: 'jorginho@gemail.ar',
        phoneNumber: '364121458',
        dirDepto: {id: 232132, nombre: 'San Justo'},
        dirProv: {id: 22555, nombre:'Córdoba'},
        dirPostCode: 5145,
        dirCity: {id: 3132, nombre: 'Arroyito'},
        dirStreet: 'Alvear 122',
        cuit: 20345551232,
        debts: 1200,
    },

    2: {
        id: 2,
        name: 'Julian Paoloski',
        numDoc: 40367988,
        docType: {id: 1, description: 'DNI'},
        email: 'julip@gemail.com.net.gob',
        phoneNumber: '3575128909',
        dirDepto: {id: 232132, nombre: 'San Justo'},
        dirProv: {id: 22555, nombre:'Córdoba'},
        dirPostCode: 5145,
        dirCity: {id: 3132, nombre: 'Arroyito'},
        dirStreet: 'Alvear 122',
        cuit: 20403679882,
        debts: 1400,
    },

    3: {
        id: 3,
        name: 'Ricardo Marquez',
        numDoc: 31598443,
        docType: {id: 1, description: 'DNI'},
        email: 'richard-marq@hotmail.com.ar',
        phoneNumber: 351675987,
        dirDepto: {id: 232132, nombre: 'San Justo'},
        dirProv: {id: 22555, nombre:'Córdoba'},
        dirPostCode: 5145,
        dirCity: {id: 3132, nombre: 'Arroyito'},
        dirStreet: 'Alvear 122',
        cuit: 20315984432,
        debts: 500,
    },

    4: {
        id: 4,
        name: 'Pedro Juliano',
        numDoc: 42666777,
        docType: {id: 1, description: 'DNI'},
        email: 'pedritopeyaso@gmail.com',
        phoneNumber: 675112334,
        dirDepto: {id: 232132, nombre: 'San Justo'},
        dirProv: {id: 22555, nombre:'Córdoba'},
        dirPostCode: 5145,
        dirCity: {id: 3132, nombre: 'Arroyito'},
        dirStreet: 'Alvear 122',
        cuit: 20426667772,
        debts: 3850,
    },
};

function getAllCustomers () {
    return customers;
};

function getCustomer (id) {
    return customers[id];
};

function addToDebt (id, debt) {
    if(id && debt){
        if(customers[id] != undefined){
            const resultNewDebts = customers[id].debts + debt;
            const toParseNumber = resultNewDebts.toFixed(2);
            customers[id].debts = parseFloat(toParseNumber);
        };
    };
};

function getFreeFirstIndex () {
    const iterableObject = Object.entries(customers);
    const newId = iterableObject.length + 1;

    return newId;
};

function checkExistance (id) {
    if( customers[id] == undefined || customers[id] == null ){

        return false;
    } else {

        return true;
    };
};

function addCustomer ({
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
    if(customers[id] == undefined){
        const codePostInt = parseInt(postCode);
        const initialDebtFloat = parseFloat(initialDebt);
        return customers[id] = {
            id,
            name,
            docType,
            numDoc,
            cuit,
            email,
            phoneNumber,
            dirProv: {id: dirProv.id, nombre: dirProv.nombre},
            dirDepto: {id: dirDepto.id, nombre: dirDepto.nombre},
            dirPostCode: codePostInt,
            dirCity: {id: dirCity.id, nombre: dirCity.nombre},
            dirStreet: street,
            debts: initialDebtFloat,
        };
    };
};

function editCustomer ({
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
    debts,
}) {
    if(customers[id] != undefined){
        return customers[id] = {
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
            debts,
        };
    };
};

function deleteCustomer (id) {
    if(customers[id] != undefined){
        delete customers[id];
    };
};

function removeFromDebts (idCustomer, amount) {
    const amountToFloat = parseFloat(amount);
    if(customers[idCustomer] != undefined){
        customers[idCustomer].debts = customers[idCustomer].debts - amountToFloat;
    };
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