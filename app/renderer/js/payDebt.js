const ipcRenderer = window.app;

async function onLoad () {
    const idCustomer = document.getElementById('idCustomer').value;
    const showCustomer = document.getElementById('showCustomer');
    const showDebt = document.getElementById('showDebt');

    const customer = await ipcRenderer.invoke('get-customer', idCustomer);

    showCustomer.innerText = `Cliente: ${customer.name}`;
    showDebt.innerText = `Deuda total: $ ${customer.debts}`;
};
onLoad();

function payWithCash () {
    const amount = document.getElementById('money').value;
    const idCustomer = document.getElementById('idCustomer').value;
    const observation = document.getElementById('observation').value;

    if(amount && observation){
        ipcRenderer.send('payDebt-cash', {amount, idCustomer, observation});
    };
};

function payWithCard () {
    const amount = document.getElementById('money').value;
    const idCustomer = document.getElementById('idCustomer').value;
    const observation = document.getElementById('observation').value;

    if(amount && observation){
        ipcRenderer.send('payDebt-card', {amount, idCustomer, observation});
    };
};

function payWithTranseference () {
    const amount = document.getElementById('money').value;
    const idCustomer = document.getElementById('idCustomer').value;
    const observation = document.getElementById('observation').value;

    if(amount && observation){
        ipcRenderer.send('payDebt-transference', {amount, idCustomer, observation});
    };
};