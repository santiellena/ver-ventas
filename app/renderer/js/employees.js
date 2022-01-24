const ipcRenderer = window.app;
let loadedEmplooy;

function loadAddEmplooy () {
    ipcRenderer.send('load-addemplooy-window');
};

function loadEditWindow (id) {
    ipcRenderer.send('load-editemplooy-window', id);
    loadedEmplooy = id;
};

ipcRenderer.on('load-new-emplooy', async () => {
    const newEmplooy = await ipcRenderer.invoke('get-added-emplooy');
    if(newEmplooy){
        const tbody = document.getElementById('tbody-employees');

        const tr = document.createElement('tr');
        tr.setAttribute('id', `emplooy${newEmplooy.id}`);
        const thId = document.createElement('th');
        thId.innerText = newEmplooy.id;
        const thName = document.createElement('th');
        thName.innerText = `${newEmplooy.name} ${newEmplooy.lastname}`;
        const thPhoneNumber = document.createElement('th');
        thPhoneNumber.innerText = newEmplooy.phoneNumber;
        const thEmail = document.createElement('th');
        thEmail.innerText = newEmplooy.email;
        const thNumDoc = document.createElement('th');
        thNumDoc.innerText = newEmplooy.numDoc;
        const thBirthDate = document.createElement('th');
        thBirthDate.innerText = newEmplooy.birthDate;
        const thDirStreet = document.createElement('th');
        thDirStreet.innerText = newEmplooy.dirStreet;
        const thButton = document.createElement('button');
        thButton.setAttribute('class', 'btn btn-warning');
        thButton.setAttribute('onclick', `loadEditWindow(${newEmplooy.id})`);
        thButton.innerText = 'Editar';
    
        tr.appendChild(thId);
        tr.appendChild(thName);
        tr.appendChild(thPhoneNumber);
        tr.appendChild(thEmail);
        tr.appendChild(thNumDoc);
        tr.appendChild(thBirthDate);
        tr.appendChild(thDirStreet);
        tr.appendChild(thButton);
    
        tbody.insertAdjacentElement('beforeend', tr);
    };
    
});

ipcRenderer.on('load-edited-emplooy', async () => {
    const emplooyEdited = await ipcRenderer.invoke('get-edited-emplooy');
    if(emplooyEdited){
        document.getElementById(`name${emplooyEdited.id}`).innerText = `${emplooyEdited.name} ${emplooyEdited.lastname}`;
        document.getElementById(`phoneNumber${emplooyEdited.id}`).innerText = emplooyEdited.phoneNumber;
        document.getElementById(`email${emplooyEdited.id}`).innerText = emplooyEdited.email;
        document.getElementById(`numDoc${emplooyEdited.id}`).innerText = emplooyEdited.numDoc;
        document.getElementById(`birthDate${emplooyEdited.id}`).innerText = emplooyEdited.birthDate;
        document.getElementById(`dirStreet${emplooyEdited.id}`).innerText = emplooyEdited.dirStreet;
    };
});

ipcRenderer.on('delete-emplooy-selected', () => {
    const tr = document.getElementById(`emplooy${loadedEmplooy}`);
    tr.remove();
    const childElements = document.getElementsByClassName('child');
    for (const element of childElements) {
        element.remove();
    }
});
