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

document.getElementById('buys-page').addEventListener('click', () => ipcRenderer.send('load-addBuys-window'));

document.getElementById('buys-history-page').addEventListener('click', () => ipcRenderer.send('load-buys-window'));

document.getElementById('suppliers-page').addEventListener('click', () => {
    ipcRenderer.send('load-suppliers-window');
});

document.getElementById('stats-page').addEventListener('click', () => loadPageInMain('stats/stats.hbs'));

document.getElementById('kardex-page').addEventListener('click', () => loadPageInMain('/stock/kardex.hbs'));

document.getElementById('stock-page').addEventListener('click', () => ipcRenderer.send('load-stock-window'));

document.getElementById('customers-page').addEventListener('click', () => ipcRenderer.send('load-customers-window'));

document.getElementById('maintenance-page').addEventListener('click', () => loadPageInMain('/maintenance/maintenance.hbs'));

document.getElementById('maintenance-branch-page').addEventListener('click', () => loadPageInMain('/maintenance/branch.hbs'));

document.getElementById('maintenance-employees-page').addEventListener('click', () => loadPageInMain('/maintenance/employees.hbs'));

document.getElementById('maintenance-users-page').addEventListener('click', () => loadPageInMain('/maintenance/users.hbs'));

document.getElementById('maintenance-docs-page').addEventListener('click', () => loadPageInMain('/maintenance/docs.hbs'));

document.getElementById('maintenance-units-page').addEventListener('click', () => loadPageInMain('/maintenance/units.hbs'));

document.getElementById('dump-page').addEventListener('click', () => loadPageInMain('/security/dump.hbs'));

// document.getElementById('').addEventListener('click', () => loadPageInMain(''));