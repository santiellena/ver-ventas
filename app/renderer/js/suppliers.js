const ipcRenderer = window.app;
let loadedSupplier;

function loadEditWindow(id) {
    ipcRenderer.send('load-editsupplier-window', id);
    loadedSupplier = id;
};

ipcRenderer.on('delete-supplier-selected', () => {
    const tr = document.getElementById(`supplier${loadedSupplier}`);
    tr.remove();
    const childElements = document.getElementsByClassName('child');
    for (const element of childElements) {
        element.remove();
    }
});

function loadAddWindow() {
    ipcRenderer.send('load-addsupplier-window');
};

ipcRenderer.on('load-new-supplier', async () => {
    const newSupplier = await ipcRenderer.invoke('get-supplier-added');
    console.log(newSupplier);
    const tbody = document.getElementById('tbody-suppliers');

    const tr = document.createElement('tr');
    tr.setAttribute('id', `supplier${newSupplier.id}`);
    const thId = document.createElement('th');
    thId.innerText = newSupplier.id;
    const thSupplierName = document.createElement('th');
    thSupplierName.innerText = newSupplier.name;
    const thPhoneNumber = document.createElement('th');
    thPhoneNumber.innerText = newSupplier.phoneNumber;
    const thCuit = document.createElement('th');
    thCuit.innerText = newSupplier.cuit;
    const thCbu = document.createElement('th');
    thCbu.innerText = newSupplier.cbu;
    const thEmail = document.createElement('th');
    thEmail.innerText = newSupplier.email;
    const thNumDoc = document.createElement('th');
    thNumDoc.innerText = newSupplier.numDoc;
    const thDirProv = document.createElement('th');
    thDirProv.innerText = newSupplier.dirProv;
    const thDirDepto = document.createElement('th');
    thDirDepto.innerText = newSupplier.dirDepto;
    const thDirPostCode = document.createElement('th');
    thDirPostCode.innerText = newSupplier.dirPostCode;
    const thDirCity = document.createElement('th');
    thDirCity.innerText = newSupplier.dirCity;
    const thDirStreet = document.createElement('th');
    thDirStreet.innerText = newSupplier.dirStreet;
    const thButton = document.createElement('button');
    thButton.setAttribute('class', 'btn btn-warning');
    thButton.setAttribute('onclick', `loadEditWindow(${newSupplier.id})`);
    thButton.innerText = 'Editar';

    tr.appendChild(thId);
    tr.appendChild(thSupplierName);
    tr.appendChild(thPhoneNumber);
    tr.appendChild(thCuit);
    tr.appendChild(thCbu);
    tr.appendChild(thEmail);
    tr.appendChild(thNumDoc);
    tr.appendChild(thDirProv);
    tr.appendChild(thDirDepto);
    tr.appendChild(thDirPostCode);
    tr.appendChild(thDirCity);
    tr.appendChild(thDirStreet);
    tr.appendChild(thButton);

    tbody.insertAdjacentElement('beforeend', tr);
});

ipcRenderer.on('load-edited-supplier', async () => {
    const supplierEdited = await ipcRenderer.invoke('get-supplier-edited');
    if(supplierEdited){
        document.getElementById(`name${supplierEdited.id}`).innerText = supplierEdited.name;
        document.getElementById(`numDoc${supplierEdited.id}`).innerText = supplierEdited.numDoc;
        document.getElementById(`cuit${supplierEdited.id}`).innerText = supplierEdited.cuit;
        document.getElementById(`dirProv${supplierEdited.id}`).innerText = supplierEdited.dirProv;
        document.getElementById(`dirDepto${supplierEdited.id}`).innerText = supplierEdited.dirDepto;
        document.getElementById(`dirPostCode${supplierEdited.id}`).innerText = supplierEdited.dirPostCode;
        document.getElementById(`dirCity${supplierEdited.id}`).innerText = supplierEdited.dirCity;
        document.getElementById(`dirStreet${supplierEdited.id}`).innerText = supplierEdited.dirStreet;
        document.getElementById(`phoneNumber${supplierEdited.id}`).innerText = supplierEdited.phoneNumber;
        document.getElementById(`email${supplierEdited.id}`).innerText = supplierEdited.email;
        document.getElementById(`cbu${supplierEdited.id}`).innerText = supplierEdited.cbu;
    }
    
});