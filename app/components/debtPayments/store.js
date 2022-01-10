const actualDate = new Date();
const date = `${actualDate.getFullYear()}/${actualDate.getMonth()+1}/${actualDate.getDate()}`;

const debtPayments = {
    1: {
        id: 1,
        date,
        emplooy: {id: 1, name:'Administrador'},
        customer: {id: 2, name: 'Julian Paoloski'},
        amount: 2200,
        observation: 'Pago la madre',
        howPaid: 'Contado',
    },
    2: {
        id: 2,
        date,
        emplooy: {id: 1, name:'Administrador'},
        customer: {id: 3, name: 'Ricardo Marquez'},
        amount: 1500,
        observation: 'Pago la hija',
        howPaid: 'Transferencia',
    },
    3: {
        id: 3,
        date,
        emplooy: {id: 1, name:'Administrador'},
        customer: {id: 2, name: 'Julian Paoloski'},
        amount: 1000,
        observation: '',
        howPaid: 'T. Crédito',
    },
    4: {
        id: 4,
        date,
        emplooy: {id: 1, name:'Administrador'},
        customer: {id: 1, name: 'Jorge Lintos'},
        amount: 500,
        observation: '',
        howPaid: 'Contado',
    },
};

function addPay ({
    emplooy,
    customer,
    amount,
    observation,
    howPaid,
}) {
    if(emplooy && customer && amount && observation && howPaid){
        const iterable = Object.entries(debtPayments);
        let id = 0;
        for (let i = 1; i < iterable.length + 1; i++) {
            if(debtPayments[i] == undefined){
                id = i;
                break;
            } else if(debtPayments[i+1] == undefined){
                id = i+1;
                break;
            };
        };

        const actualDate = new Date();
        const date = `${actualDate.getFullYear()}/${actualDate.getMonth()+1}/${actualDate.getDate()}`;

        return debtPayments[id] = {
            id,
            emplooy,
            customer,
            amount,
            observation,  
            howPaid,
            date,
        };
    };
};

function getPaymentsByCustomer (idCustomer) {
    if(idCustomer){
        const payments = [];

        const iterator = Object.entries(debtPayments);

        iterator.map(e => {
            if(e[1].customer.id == idCustomer){

                payments.push(debtPayments[e[0]]);
            };
        });
        return payments;
    };
};

module.exports = {
    addPay,
    getPaymentsByCustomer,
};