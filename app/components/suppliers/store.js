const suppliers = {
    1: {
        id: 1,
        name: 'La Campesina S.A.S',
        docType: 'RUC',
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

function deleteSupplier(id){
    if(id != null & id!= undefined){
        delete suppliers[id];
    };
};

function addSupplier({
    supplierName,
    docType,
    numDoc,
    dirDepto,
    dirProv,
    dirPostCode,
    dirCity,
    dirStreet,
    cuit,
    phoneNumber,
    email,
    cbu,
}) {
    const iterableObject = Object.entries(suppliers);
    const newId = iterableObject.length + 1;
    return suppliers[newId] = {
        id: newId,
        name: supplierName,
        docType,
        numDoc,
        dirDepto,
        dirProv,
        dirPostCode,
        dirCity,
        dirStreet,
        cuit,
        phoneNumber,
        email,
        cbu,
    };
};

function editSupplier({
        id,
        supplierName,
        docType,
        numDoc,
        cuit,
        dirProv,
        dirDepto,
        postCode,
        dirCity,
        dirStreet,
        phoneNumber,
        email, 
        cbu,
}) {
    if(id, supplierName, docType, numDoc, cuit, dirProv, dirDepto, postCode, dirCity, dirStreet, phoneNumber, email, cbu){
        const edit = {
            id,
            name: supplierName,
            docType,
            numDoc,
            cuit,
            dirProv,
            dirDepto,
            dirPostCode: postCode,
            dirCity,
            dirStreet,
            phoneNumber,
            email, 
            cbu,
        };
       
        suppliers[id] = edit;
        return suppliers[id];
    }
};

module.exports = {
    getAllSuppliers,
    getSupplier,
    deleteSupplier,
    addSupplier,
    editSupplier,
}