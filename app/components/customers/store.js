const customers = {
    1: {
        id: 1,
        name: 'Jorge Lintos',
        document: '34.555.123',
        email: 'jorginho@gemail.ar',
        phoneNumber: '364121458',
        address: 'Formosa 134',
        debts: 1200,
    },

    2: {
        id: 2,
        name: 'Julian Paoloski',
        document: '40.367.988',
        email: 'julip@gemail.com.net.gob',
        phoneNumber: '3575128909',
        address: 'Arroyo Bonito 677',
        debts: 1400,
    },

    3: {
        id: 3,
        name: 'Ricardo Marquez',
        document: '31.598.443',
        email: 'richard-marq@hotmail.com.ar',
        phoneNumber: '351675987',
        address: 'San Martin 585',
        debts: 500,
    },

    4: {
        id: 4,
        name: 'Pedro Juliano',
        document: '42.666.777',
        email: 'pedritopeyaso@gmail.com',
        phoneNumber: '675112334',
        address: 'San Justo 112',
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

module.exports = {
    getAllCustomers,
    getCustomer,
    addToDebt,
};