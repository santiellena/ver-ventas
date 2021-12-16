const suppliers = {
    1: {
        id: 1,
        name: 'La Campesina S.A.S',
        docType: 'DNI',
        numDoc: 32664333,
        dirDepto: 'San Justo',
        dirProv: 'Córdoba',
        dirPostCode: '5145',
        dirCity: 'Arroyito',
        dirStreet: 'Alvear 122',
        cuit: 19326643332,
        phoneNumber: 351443367,
        email: 'lacampesina@workmail.com',
        cbu: 001334255525455,
    },
    2: {
        id: 2,
        name: 'Perico S.A',
        docType: 'DNI',
        numDoc: 24456666,
        dirDepto: 'Capital',
        dirProv: 'Córdoba',
        dirPostCode: '5000',
        dirCity: 'Córdoba',
        dirStreet: 'Av. Patricios 331',
        cuit: 19244566662,
        phoneNumber: 351413312,
        email: 'pericoinsumos@proveedor.com',
        cbu: 000002331422370,
    },
    3: {
        id: 3,
        name: 'Roberto Carlos',
        docType: 'DNI',
        numDoc: 6676654,
        dirDepto: 'Manzanares',
        dirProv: 'San Luis',
        dirPostCode: '6344',
        dirCity: 'Los Manzanos',
        dirStreet: 'San Martin 865',
        cuit: 2166766542,
        phoneNumber: 563908765,
        email: 'robertinho@gmail.com.futbol',
        cbu: 0000143433712212,
    },
    4: {
        id: 4,
        name: 'KRU United & Co.',
        docType: 'DNI',
        numDoc: 23333222,
        dirDepto: 'Carmen',
        dirProv: 'Buenos Aires',
        dirPostCode: '133',
        dirCity: 'CABA',
        dirStreet: 'Colonia Arroyos 099',
        cuit: 21233332223,
        phoneNumber: 34555667,
        email: 'kreukun@united.com.ar',
        cbu: 0002212743142232,
    },
};

function getAllSuppliers() {
    return suppliers;
};

function getSupplier(id) {
    return suppliers[id];
};

module.exports = {
    getAllSuppliers,
    getSupplier,
}