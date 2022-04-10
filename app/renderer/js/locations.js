const ipcRenderer = window.app;

async function addLocationStore () {
    const description = document.getElementById('new-store').value;
    
    const newStore = await ipcRenderer.invoke('new-location-store', description);
    const tbody = document.getElementById('tbody-store');

    if(newStore){
        const tr = document.createElement('tr');
        tr.setAttribute('id', `store${newStore.id}`);
        const tdId = document.createElement('td');
        tdId.innerText = newStore.id;
        const tdName = document.createElement('td');
        tdName.innerText = newStore.description;
        const tdButton = document.createElement('td');
        const button = document.createElement('button');
        button.setAttribute('class', 'btn btn-danger');
        button.setAttribute('onclick', `deleteStore(${newStore.id})`);
        button.innerText = 'X';
        tdButton.appendChild(button);

        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdButton);

        tbody.insertAdjacentElement('beforeend', tr);

        document.getElementById('new-store').value = null;
    };
};

async function addLocationExposition () {
    const description = document.getElementById('new-exposition').value;
    
    const newExposition = await ipcRenderer.invoke('new-location-exposition', description);
    const tbody = document.getElementById('tbody-exposition');
    if(newExposition){
        const tr = document.createElement('tr');
        tr.setAttribute('id', `exposition${newExposition.id}`);
        const tdId = document.createElement('td');
        tdId.innerText = newExposition.id;
        const tdName = document.createElement('td');
        tdName.innerText = newExposition.description;
        const tdButton = document.createElement('td');
        const button = document.createElement('button');
        button.setAttribute('class', 'btn btn-danger');
        button.setAttribute('onclick', `deleteExposition(${newExposition.id})`);
        button.innerText = 'X';
        tdButton.appendChild(button);

        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdButton);

        tbody.insertAdjacentElement('beforeend', tr);

        document.getElementById('new-exposition').value = null;
    };
};

function deleteStore (id) {
    ipcRenderer.send('delete-location-store', id);

    const tr = document.getElementById(`store${id}`);
    tr.remove();
};

function deleteExposition (id) {
    ipcRenderer.send('delete-location-exposition', id);

    const tr = document.getElementById(`exposition${id}`);
    tr.remove();
};