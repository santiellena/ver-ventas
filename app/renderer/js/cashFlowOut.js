const ipcRenderer = window.app;
let limitAmount = 0;

const onload = async e => {
    limitAmount = await ipcRenderer.invoke('get-limit-cashout-amount');

    const limit = document.getElementById('limit');
    limit.value = limitAmount;
};

onload();

document.getElementById('history').addEventListener('click', () => {
    ipcRenderer.send('load-cashflowhistory-window');
});

function addRegister () {
    const amount = document.getElementById('amount').value;
    const observation = document.getElementById('observation').value;

    if(amount && observation) {
        if(parseFloat(amount) <= limitAmount){
            ipcRenderer.send('add-cashflow-out', {amount, observation});
        } else {
            const alertDiv = document.getElementById('alert-div');
            alertDiv.innerHTML ='<div class="alert alert-warning alert-dismissible col-md-9 col-sm-9" role="alert" style="margin-left: 2rem"><button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="clearAlert();"><span aria-hidden="true">×</span></button><strong>Atención!</strong> Limite de retiro superado.</div>';
        };
        
    };
};

ipcRenderer.on('confirm-cashflow-out', () => {
    window.close();
});

function clearAlert () {
    const alertDiv = document.getElementById('alert-div');
    alertDiv.innerHTML = '';
};