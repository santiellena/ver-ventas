const ipcRenderer = window.app;
let verifier = false;

function resetSearchs () {
    const tbodySells = document.getElementById('tbody-sells');
    const tbodyPayments = document.getElementById('tbody-payments');

    tbodySells.innerHTML = '<tr class="odd" id="tr-alert-sells"><td valign="top" colspan="5" class="dataTables_empty">Ninguna Venta Existente</td></tr>';
    tbodyPayments.innerHTML = '<tr class="odd" id="tr-alert-payments"><td valign="top" colspan="6" class="dataTables_empty">Ninguna Pago de Deuda Existente</td></tr>';
};

async function checkCustomerExistense () {
    const idCustomer = document.getElementById('id-customer').value;
    
    if(idCustomer){
        const customer = await ipcRenderer.invoke('get-customer', idCustomer);
        const shower = document.getElementById('name-customer');
        const debt = document.getElementById('debt-customer');
        if(customer){
            verifier = true;
            debt.value = `$ ${customer.debt}`;
            shower.value = customer.name;
        } else {
            shower.value = 'Cliente no encontrado...';
            verifier = false;
        };
    } else {
        const shower = document.getElementById('name-customer');
        const debt = document.getElementById('debt-customer');
        shower.value = 'Cliente';
        debt.value = '$ Deuda';
        verifier = false;
    }
};

async function searchSellsAndPayments () {
    const idCustomer = document.getElementById('id-customer').value;
    if(verifier == true && idCustomer){
        const tbodySells = document.getElementById('tbody-sells');
        const tbodyPayments = document.getElementById('tbody-payments');

        const sells = await ipcRenderer.invoke('get-sells-by-customer', idCustomer);
        const payments = await ipcRenderer.invoke('get-payments-by-customer', idCustomer);
        if (sells.length > 0) {
            
           tbodySells.innerHTML = '';
            
            for (const sell of sells) {
                const tr = document.createElement('tr');
                const thId = document.createElement('th');
                thId.innerText = sell.id;
                const thDate = document.createElement('th');
                thDate.innerText = sell.date;
                const thEmplooy = document.createElement('th');
                thEmplooy.innerText = sell.user.emplooy.name;
                const thAmount = document.createElement('th');
                thAmount.innerText = `$ ${sell.totalAmount}`;
                const thHowMuchPaid = document.createElement('th');
                thHowMuchPaid.innerText = `$ ${ sell.howMuchPaid}`;

                tr.appendChild(thId);
                tr.appendChild(thDate);
                tr.appendChild(thEmplooy);
                tr.appendChild(thAmount);
                tr.appendChild(thHowMuchPaid);

                tbodySells.insertAdjacentElement('beforeend', tr);
            };

            if (payments.length > 0) {
                tbodyPayments.innerHTML = '';
    
                payments.map(payment => {
                    const tr = document.createElement('tr');
                    const thId = document.createElement('th');
                    thId.innerText = payment.id;
                    const thDate = document.createElement('th');
                    thDate.innerText = payment.date;
                    const thEmplooy = document.createElement('th');
                    thEmplooy.innerText = payment.user.emplooy.name;
                    const thAmount = document.createElement('th');
                    thAmount.innerText = `$ ${payment.amount}`;
                    const thHowPaid = document.createElement('th');
                    thHowPaid.innerText = payment.howPaid;
                    const thObservation = document.createElement('th');
                    thObservation.innerText = payment.observation;

                    tr.appendChild(thId);
                    tr.appendChild(thDate);
                    tr.appendChild(thEmplooy);
                    tr.appendChild(thAmount);
                    tr.appendChild(thHowPaid);
                    tr.appendChild(thObservation);
    
                    tbodyPayments.insertAdjacentElement('beforeend', tr);
                });
            };
        };
    };
};

function addPayment () {
    if(verifier == true){
        const idCustomer = document.getElementById('id-customer').value;
        if(idCustomer){
            ipcRenderer.send('load-paydebts-window', idCustomer);
        };
    };
};

ipcRenderer.on('load-new-payment', () => {
    searchSellsAndPayments(); 
});