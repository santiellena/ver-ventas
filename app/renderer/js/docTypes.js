const ipcRenderer = window.app

async function addDocType () {
    const newName = document.getElementById('new-docType').value;

    const newDocType = await ipcRenderer.invoke('new-docType', newName);

    const tbody = document.getElementById('tbody-docTypes');

    if(newDocType){
        const tr = document.createElement('tr');
        tr.setAttribute('id', `tr${newDocType.id}`);
        const tdId = document.createElement('td');
        tdId.innerText = newDocType.id;
        const tdName = document.createElement('td');
        tdName.innerText = newDocType.description;
        const tdButton = document.createElement('td');
        const button = document.createElement('button');
        button.setAttribute('class', 'btn btn-danger');
        button.setAttribute('onclick', `deleteDocType(${newDocType.id})`);
        button.innerText = 'X';
        tdButton.appendChild(button);

        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdButton);

        tbody.insertAdjacentElement('beforeend', tr);

        document.getElementById('new-docType').value = null;
    };
};

function deleteDocType (id) {
    ipcRenderer.send('delete-docType', id);

    const tr = document.getElementById(`tr${id}`);
    tr.remove();
};