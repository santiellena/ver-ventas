const ipcRenderer = window.app;

const loadPageInMain = (fileName) => {
    ipcRenderer.send('load-page-main', fileName);
}

document.getElementById('nav-main-logo').addEventListener('click', () => loadPageInMain('/sells/index.hbs'));

document.getElementById('generate-sell-page').addEventListener('click', () => loadPageInMain('/sells/index.hbs'));

document.getElementById('generate-order-page').addEventListener('click', () => loadPageInMain('/sells/order.hbs'));

document.getElementById('view-history-page').addEventListener('click', () => loadPageInMain('/sells/history.hbs'));

document.getElementById('buys-page').addEventListener('click', () => loadPageInMain('buys/buys.hbs'));

document.getElementById('buys-history-page').addEventListener('click', () => loadPageInMain('/buys/history.hbs'));

document.getElementById('stats-page').addEventListener('click', () => loadPageInMain('stats/stats.hbs'));

document.getElementById('query-sells-page').addEventListener('click', () => loadPageInMain('/query/sells.hbs'));

document.getElementById('query-sells-detail-page').addEventListener('click', () => loadPageInMain('query-sells-detail.hbs'));

document.getElementById('query-sells-pending-page').addEventListener('click', () => loadPageInMain('query-sells-pending.hbs'));

document.getElementById('query-sells-cash-page').addEventListener('click', () => loadPageInMain('/query/sells-cash.hbs'));

document.getElementById('query-sells-credit-page').addEventListener('click', () => loadPageInMain('/query/sells-credit.hbs'));

document.getElementById('query-sells-customer-page').addEventListener('click', () => loadPageInMain('/query/sells-credit.hbs'));

document.getElementById('query-sells-employee-page').addEventListener('click', () => loadPageInMain('/query/sells-employee.hbs'));

document.getElementById('query-sells-employee-detail-page').addEventListener('click', () => loadPageInMain('/query/sells-employee-detail.hbs'));

document.getElementById('query-buys-page').addEventListener('click', () => loadPageInMain('/query/buys.hbs'));

document.getElementById('query-buys-detail-page').addEventListener('click', () => loadPageInMain('/query/buys-detail.hbs'));

document.getElementById('query-buys-supplier-page').addEventListener('click', () => loadPageInMain('/query/buys-supplier.hbs'));

document.getElementById('query-buys-supplier-detail-page').addEventListener('click', () => loadPageInMain('/query/buys-supplier-detail.hbs'));

document.getElementById('kardex-page').addEventListener('click', () => loadPageInMain('/stock/kardex.hbs'));

document.getElementById('stock-page').addEventListener('click', () => loadPageInMain('/stock/stock.hbs'));

document.getElementById('maintenance-page').addEventListener('click', () => loadPageInMain('/maintenance/maintenance.hbs'));

document.getElementById('maintenance-branch-page').addEventListener('click', () => loadPageInMain('/maintenance/branch.hbs'));

document.getElementById('maintenance-employees-page').addEventListener('click', () => loadPageInMain('/maintenance/employees.hbs'));

document.getElementById('maintenance-users-page').addEventListener('click', () => loadPageInMain('/maintenance/users.hbs'));

document.getElementById('maintenance-docs-page').addEventListener('click', () => loadPageInMain('/maintenance/docs.hbs'));

document.getElementById('maintenance-units-page').addEventListener('click', () => loadPageInMain('/maintenance/units.hbs'));

document.getElementById('dump-page').addEventListener('click', () => loadPageInMain('/security/dump.hbs'));

document.getElementById('settings-page').addEventListener('click', () => loadPageInMain('settings.hbs'));

document.getElementById('profile-page').addEventListener('click', () => loadPageInMain('profile.hbs'));

// document.getElementById('').addEventListener('click', () => loadPageInMain(''));