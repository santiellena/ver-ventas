const ipcRenderer = window.app;

document.getElementById('add-product-button').addEventListener('click', () => {
    ipcRenderer.send('load-addproduct-window');
});

document.getElementById('edit-product-button').addEventListener('click', () => {
    ipcRenderer.send('load-editproduct-window');
});

document.getElementById('delete-product-button').addEventListener('click', () => {
    ipcRenderer.send('load-deleteproduct-window');
});

document.getElementById('add-buy-button').addEventListener('click', () => {
    ipcRenderer.send('load-addBuys-window');
});

document.getElementById('departments-button').addEventListener('click', () => {
    ipcRenderer.send('load-departments-window');
});

async function loadNumberData() {
    const showerInvestment = document.getElementById('investment-amount');
    const showerProfit = document.getElementById('profit-amount');

    const amounts = await ipcRenderer.invoke('get-buys-profitandinvestment');
    const { investment, profit } = amounts;

    showerInvestment.value = `$ ${investment}`;
    showerProfit.value = `$ ${profit}`;
};
loadNumberData();

async function loadDepartments() {
    const departments = await ipcRenderer.invoke('get-departments');
    const iterable = Object.entries(departments);

    const select = document.getElementById('department');

    for (const department of iterable) {
        const option = document.createElement('option');
        option.value = department[1].id;
        option.innerText = department[1].description;

        select.appendChild(option);
    };
};
loadDepartments();