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
        option.setAttribute('id', `option${department[1].id}`);
        option.value = department[1].id;
        option.innerText = department[1].description;

        select.appendChild(option);
    };
};
loadDepartments();

ipcRenderer.on('update-departments-list', async () => {
    const newDepartment = await ipcRenderer.invoke('get-department-update');

    const select = document.getElementById('department');
    const option = document.createElement('option');
    option.setAttribute('id', `option${newDepartment.id}`);
    option.value = newDepartment.id;
    option.innerText = newDepartment.description;

    select.appendChild(option);
});

ipcRenderer.on('update-departments-list-delete', async () => {
    const idDeleted = await ipcRenderer.invoke('deleted-department');
    if(idDeleted){
        const option = document.getElementById(`option${idDeleted}`);
        option.remove();
    };
   
});

ipcRenderer.on('update-newproduct-list', async () => {
    const newProduct = await ipcRenderer.invoke('get-newproduct-tolist');
    const trAlert = document.getElementById('tr-alert');
    const tbody = document.getElementById('tbody-products');
    
    if(trAlert){
        trAlert.remove();
    };

    const tr = document.createElement('tr');
    tr.setAttribute('id', `tr${newProduct.id}`);
    const thId = document.createElement('th');
    thId.innerText = newProduct.id;
    const thDesc = document.createElement('th');
    thDesc.innerText = newProduct.description;
    const thStock = document.createElement('th');
    thStock.innerText = newProduct.stock;
    const thBuyPrice = document.createElement('th');
    thBuyPrice.innerText = `$ ${newProduct.buyPrice}`;;
    const thWholesalerPrice = document.createElement('th');
    thWholesalerPrice.innerText = `$ ${newProduct.wholesalerPrice}`;
    const thUnitPrice = document.createElement('th');
    thUnitPrice.innerText = `$ ${newProduct.unitPrice}`;
    const thDepartment = document.createElement('th');
    thDepartment.innerText = newProduct.department;
    const thLocation = document.createElement('th');
    thLocation.innerText = `${newProduct.location[0]},${newProduct.location[1]}`
    const thUnitMeasure = document.createElement('th');
    thUnitMeasure.innerText = newProduct.unitMeasure;

    tr.appendChild(thId);
    tr.appendChild(thDesc);
    tr.appendChild(thStock);
    tr.appendChild(thBuyPrice);
    tr.appendChild(thWholesalerPrice);
    tr.appendChild(thUnitPrice);
    tr.appendChild(thDepartment);
    tr.appendChild(thLocation);
    tr.appendChild(thUnitMeasure);

    tbody.insertAdjacentElement('beforeend', tr);
});

ipcRenderer.on('update-products-list-bydelete', async () => {
    const idDeleted = await ipcRenderer.invoke('get-deleted-id');

    if(idDeleted){
        const tr = document.getElementById(`tr${idDeleted}`);
        tr.remove();

        const tbody = document.getElementById('tbody-products');
        console.log(tbody);
        if(tbody.children.length == 0){
            const trAlert = document.createElement('tr');
            trAlert.setAttribute('class', 'odd');
            trAlert.setAttribute('id', 'tr-alert');
            const tdAlert = document.createElement('td');
            tdAlert.setAttribute('valign', 'top');
            tdAlert.setAttribute('colspan', '9');
            tdAlert.setAttribute('class', 'dataTables_empty');
            tdAlert.innerText = 'Ningún Producto Existente';
            trAlert.appendChild(tdAlert);
    
            tbody.appendChild(trAlert);
        };
    };
});