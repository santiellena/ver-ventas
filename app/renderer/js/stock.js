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

document.getElementById('locations-button').addEventListener('click', () => {
    ipcRenderer.send('load-locations-window');
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
//loadDepartments();

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
    thId.setAttribute('id', `id${newProduct.id}`);
    thId.innerText = newProduct.id;
    const thDesc = document.createElement('th');
    thDesc.setAttribute('id', `desc${newProduct.id}`);
    thDesc.innerText = newProduct.description;
    const thStock = document.createElement('th');
    thStock.setAttribute('id', `stock${newProduct.id}`);
    thStock.innerText = newProduct.stock;
    const thBuyPrice = document.createElement('th');
    thBuyPrice.setAttribute('id', `buyPrice${newProduct.id}`);
    thBuyPrice.innerText = `$ ${newProduct.buyPrice}`;
    const thWholesalerPrice = document.createElement('th');
    thWholesalerPrice.setAttribute('id', `wholesalerPrice${newProduct.id}`);
    thWholesalerPrice.innerText = `$ ${newProduct.wholesalerPrice}`;
    const thUnitPrice = document.createElement('th');
    thUnitPrice.setAttribute('id', `unitPrice${newProduct.id}`);
    thUnitPrice.innerText = `$ ${newProduct.unitPrice}`;
    const thLocation = document.createElement('th');
    thLocation.setAttribute('id', `location${newProduct.id}`);
    thLocation.innerText = `${newProduct.store.description}, ${newProduct.exposition.description}`;
    const thUnitMeasure = document.createElement('th');
    thUnitMeasure.setAttribute('id', `unitMeasure${newProduct.id}`);
    thUnitMeasure.innerText = `${newProduct.unitMeasure.longDescription} (${newProduct.unitMeasure.shortDescription})`;

    tr.appendChild(thId);
    tr.appendChild(thDesc);
    tr.appendChild(thStock);
    tr.appendChild(thBuyPrice);
    tr.appendChild(thWholesalerPrice);
    tr.appendChild(thUnitPrice);
    tr.appendChild(thLocation);
    tr.appendChild(thUnitMeasure);

    
    let table = $('#datatable-buttons').DataTable();
 
    let rowNode = table
        .row.add(tr)
        .draw()
        .node();
     
    $( rowNode )
        .css( 'color', 'red' )
        .animate( { color: 'black' } );
   
});

ipcRenderer.on('update-products-list-bydelete', async () => {
    const idDeleted = await ipcRenderer.invoke('get-deleted-id');

    if(idDeleted){
        const tr = document.getElementById(`tr${idDeleted}`);
        tr.remove();

        const tbody = document.getElementById('tbody-products');
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

ipcRenderer.on('update-products-list-byedit', async () => {
    const product = await ipcRenderer.invoke('get-modified-id');
    
    document.getElementById(`desc${product.id}`).innerText = product.description;
    document.getElementById(`stock${product.id}`).innerText = product.stock;
    document.getElementById(`buyPrice${product.id}`).innerText = `$ ${product.buyPrice}`;
    document.getElementById(`wholesalerPrice${product.id}`).innerText = `$ ${product.wholesalerPrice}`;
    document.getElementById(`unitPrice${product.id}`).innerText = `$ ${product.unitPrice}`;
    document.getElementById(`location${product.id}`).innerText = `${product.store.description}, ${product.exposition.description}`;
    document.getElementById(`unitMeasure${product.id}`).innerText = `${product.unitMeasure.longDescription} (${product.unitMeasure.shortDescription})`;
});
