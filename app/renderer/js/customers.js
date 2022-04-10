const ipcRenderer = window.app;

document.getElementById('add-customer-button').addEventListener('click', () => {
    ipcRenderer.send('load-addcustomer-window');
});

document.getElementById('edit-customer-button').addEventListener('click', () => {
    ipcRenderer.send('load-editcustomer-window');
});

document.getElementById('delete-customer-window').addEventListener('click', () => {
    ipcRenderer.send('load-deletecustomer-window');
});

document.getElementById('pay-customer-debt').addEventListener('click', () => {
    ipcRenderer.send('load-listdebts-window');
});

ipcRenderer.on('update-customer-list-fromadd', async () => {
    const added = await ipcRenderer.invoke('get-added-customer-update');
    if(added){
        const tbody = document.getElementById('tbody-customers');

        const tr = document.createElement('tr');
        tr.setAttribute('id', `tr${added.id}`); 

        const thId = document.createElement('th');
        thId.setAttribute('id', `id${added.id}`);
        thId.innerText = added.id;

        const thName = document.createElement('th');
        thName.setAttribute('id', `name${added.id}`);
        thName.innerText = added.name;

        const thDocType = document.createElement('th');
        thDocType.setAttribute('id', `docType${added.id}`);
        thDocType.innerText = added.docType.description;

        const thNumDoc = document.createElement('th');
        thNumDoc.setAttribute('id', `numDoc${added.id}`);
        thNumDoc.innerText = added.numDoc;

        const thCuit = document.createElement('th');
        thCuit.setAttribute('id', `cuit${added.id}`);
        thCuit.innerText = added.cuit;

        const thEmail = document.createElement('th');
        thEmail.setAttribute('id', `email${added.id}`);
        thEmail.innerText = added.email;

        const thPhoneNumber = document.createElement('th');
        thPhoneNumber.setAttribute('id', `phoneNumber${added.id}`);
        thPhoneNumber.innerText = added.phoneNumber;

        const thCity = document.createElement('th');
        thCity.setAttribute('id', `city${added.id}`);
        thCity.innerText = added.dirCity.nombre;

        const thStreet  = document.createElement('th');
        thStreet.setAttribute('id', `street${added.id}`);
        thStreet.innerText = added.dirStreet;

        const thInitialDebts = document.createElement('th');
        thInitialDebts.setAttribute('id', `debt${added.id}`);
        thInitialDebts.innerText = `$ ${added.debt}`;

        tr.appendChild(thId);
        tr.appendChild(thName);
        tr.appendChild(thDocType);
        tr.appendChild(thNumDoc);
        tr.appendChild(thCuit);
        tr.appendChild(thEmail);
        tr.appendChild(thPhoneNumber);
        tr.appendChild(thCity);
        tr.appendChild(thStreet);
        tr.appendChild(thInitialDebts);

        tbody.insertAdjacentElement('beforeend', tr);
    };
});

ipcRenderer.on('update-customer-list-fromedit', async () => {
    const customer= await ipcRenderer.invoke('get-edited-customer');

    const thId = document.getElementById(`id${customer.id}`);
    thId.innerText = customer.id;

    const thName = document.getElementById(`name${customer.id}`);
    thName.innerText = customer.name;

    const thDocType = document.getElementById(`docType${customer.id}`);
    thDocType.innerText = customer.docType.description;

    const thNumDoc = document.getElementById(`numDoc${customer.id}`);
    thNumDoc.innerText = customer.numDoc;

    const thCuit = document.getElementById(`cuit${customer.id}`);
    thCuit.innerText = customer.cuit;

    const thEmail = document.getElementById(`email${customer.id}`);
    thEmail.innerText = customer.email;

    const thPhoneNumber = document.getElementById(`phoneNumber${customer.id}`);
    thPhoneNumber.innerText = customer.phoneNumber;

    const thCity = document.getElementById(`city${customer.id}`);
    thCity.innerText = customer.dirCity.nombre;

    const thStreet = document.getElementById(`street${customer.id}`);
    thStreet.innerText = customer.street;

    const thDebts = document.getElementById(`debt${customer.id}`);
    thDebts.innerText = `$ ${customer.debt}`;
});

ipcRenderer.on('update-customers-list-bydelete', async () => {
    const idDeleted = await ipcRenderer.invoke('get-idcustomer-deleted');

    const tr = document.getElementById(`tr${idDeleted}`);
    tr.remove();

    const tbody = document.getElementById('tbody-customers');
    if(tbody.children.length == 0){
        const trAlert = document.createElement('tr');
        trAlert.setAttribute('class', 'odd');
        trAlert.setAttribute('id', 'tr-alert');
        const tdAlert = document.createElement('td');
        tdAlert.setAttribute('valign', 'top');
        tdAlert.setAttribute('colspan', '10');
        tdAlert.setAttribute('class', 'dataTables_empty');
        tdAlert.innerText = 'Ningún Cliente Existente';
        trAlert.appendChild(tdAlert);

        tbody.appendChild(trAlert);
    };
});