const ipcRenderer = window.app;
document.getElementById('history').addEventListener('click', () => {
    ipcRenderer.send('load-cashflowhistory-window');
});

function addRegister () {
    const amount = document.getElementById('amount').value;
    const observation = document.getElementById('observation').value;

    if(amount && observation) {
        ipcRenderer.send('add-cashflow-in', {amount, observation});
    };
};

ipcRenderer.on('confirm-cashflow-in', () => {
    window.close();
});