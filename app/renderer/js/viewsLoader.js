const ipcRenderer = window.app;

const loadPageInMain = (fileName) => {
    ipcRenderer.send('load-page-main', fileName);
}

document.getElementById('nav-main-logo').addEventListener('click', () => loadPageInMain('/sells/index.hbs'));

document.getElementById('generate-sell-page').addEventListener('click', () => loadPageInMain('/sells/index.hbs'));

document.getElementById('load-orders-window').addEventListener('click', () => {
    ipcRenderer.send('load-orders-window');
});

document.getElementById('view-history-page').addEventListener('click', () => {
    ipcRenderer.send('open-sells-history');
});

document.getElementById('sales-page').addEventListener('click', () => ipcRenderer.send('load-sales-page'));

document.getElementById('buys-page').addEventListener('click', () => ipcRenderer.send('load-addBuys-window'));

document.getElementById('buys-history-page').addEventListener('click', () => ipcRenderer.send('load-buys-window'));

document.getElementById('suppliers-page').addEventListener('click', () => {
    ipcRenderer.send('load-suppliers-window');
});

document.getElementById('cashregister-in-page').addEventListener('click', () => {
    ipcRenderer.send('load-cashflowin-window'); 
});

document.getElementById('cashregister-out-page').addEventListener('click', () => {
    ipcRenderer.send('load-cashflowout-window'); 
});

document.getElementById('history-in-out-page').addEventListener('click', () => {
    ipcRenderer.send('load-cashflowhistory-window'); 
});

document.getElementById('stats-page').addEventListener('click', () => ipcRenderer.send('load-stats-page'));

document.getElementById('stock-page').addEventListener('click', () => ipcRenderer.send('load-stock-window'));

document.getElementById('customers-page').addEventListener('click', () => ipcRenderer.send('load-customers-window'));

document.getElementById('maintenance-page').addEventListener('click', () => ipcRenderer.send('load-general-window'));

document.getElementById('maintenance-branch-page').addEventListener('click', () => ipcRenderer.send('load-branches-window'));

document.getElementById('maintenance-employees-page').addEventListener('click', () => ipcRenderer.send('load-employees-window'));

document.getElementById('maintenance-users-page').addEventListener('click', () => ipcRenderer.send('load-users-window'));

document.getElementById('maintenance-docs-page').addEventListener('click', () => ipcRenderer.send('load-docs-window'));

document.getElementById('maintenance-units-page').addEventListener('click', () => ipcRenderer.send('load-units-window'));

document.getElementById('dump-page').addEventListener('click', () => ipcRenderer.send('dump-database'));

// document.getElementById('').addEventListener('click', () => loadPageInMain(''));