const actualDate = new Date();
const date = `${actualDate.getFullYear()}/${actualDate.getMonth()+1}/${actualDate.getDate()}-${actualDate.getHours()}:${actualDate.getMinutes()}`;

const cashFlow = {
    1: {
        id: 1,
        date,
        emplooy: { id: 1, name: 'Administrador' },
        amount: 100,
        operation: 'IN',
        observation: 'Cambio',
        box: 2,
    },
    2: {
        id: 2,
        date,
        emplooy: { id: 1, name: 'Administrador' },
        amount: 2000,
        operation: 'OUT',
        observation: 'NO',
        box: 1,
    },
    3: {
        id: 3,
        date,
        emplooy: { id: 1, name: 'Administrador' },
        amount: 430,
        operation: 'IN',
        observation: 'Cambio',
        box: 1,
    },
    4: {
        id: 4,
        date,
        emplooy: { id: 1, name: 'Administrador' },
        amount: 3500,
        operation: 'OUT',
        observation: 'Pago proveedor',
        box: 1,
    },
    5: {
        id: 5,
        date,
        emplooy: { id: 1, name: 'Administrador' },
        amount: 270,
        operation: 'IN',
        observation: 'Cambio',
        box: 1,
    },
    6: {
        id: 6,
        date,
        emplooy: { id: 1, name: 'Administrador' },
        amount: 10000,
        operation: 'OUT',
        observation: 'Sueldo empleados',
        box: 2,
    },
};

function getAllRegisters () {
    return cashFlow;
};

function addRegister ({
    emplooy,
    amount,
    operation,
    observation,
    box,
}) {
    if(emplooy && amount && operation && box && observation) {
        const iterable = Object.entries(cashFlow);
        let id = 0;
        for (let i = 1; i < iterable.length + 1; i++) {
            if(cashFlow[i] == undefined){
                id = i;
                break;
            } else if(cashFlow[i+1] == undefined){
                id = i+1;
                break;
            };
        };

        const nowActualDate = new Date();
        const nowDate = `${nowActualDate.getFullYear()}/${nowActualDate.getMonth()+1}/${nowActualDate.getDate()}-${nowActualDate.getHours()}:${nowActualDate.getMinutes()}`;

        if(cashFlow[id] == undefined) {
            return cashFlow[id] = {
                id,
                date: nowDate,
                emplooy,
                amount,
                operation,
                observation,
                box,
            };
        } else return null;
    } else return null;
};

module.exports = {
    getAllRegisters,
    addRegister,
};