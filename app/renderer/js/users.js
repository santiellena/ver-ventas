const ipcRenderer = window.app;

function loadAddUser () {
    ipcRenderer.send('load-adduser-window');
};

function loadEditWindow (id) {
    ipcRenderer.send('load-edituser-window', id);
};

ipcRenderer.on('update-userslist-bydelete', async () => {
    const idUserDeleted = await ipcRenderer.invoke('get-user-deleted');
    
    const tr = document.getElementById(`user${idUserDeleted}`);
    tr.remove();
});

ipcRenderer.on('update-userslist-bynew', async () => {
    const newUser = await ipcRenderer.invoke('get-added-user');
    const tbody = document.getElementById('tbody-users');

    const tr = document.createElement('tr');
    tr.setAttribute('id', `user${newUser.id}`);
    const thName = document.createElement('th');
    thName.setAttribute('id', `name${newUser.id}`);
    thName.innerText = `${newUser.name} ${newUser.lastname}`;
    const thEmail = document.createElement('th');
    thEmail.setAttribute('id', `email${newUser.id}`);
    thEmail.innerText = newUser.email;
    const thBranch = document.createElement('th');
    thBranch.setAttribute('id', `branch${newUser.id}`);
    thBranch.innerText = newUser.branchName;
    const thButton = document.createElement('th');
    const button = document.createElement('button');
    button.setAttribute('class', 'btn btn-warning');
    button.setAttribute('onclick', `loadEditWindow(${newUser.id})`);
    button.innerText = 'Ver Permisos';
    thButton.appendChild(button);

    tr.appendChild(thName);
    tr.appendChild(thEmail);
    tr.appendChild(thBranch);
    tr.appendChild(thButton);

    tbody.insertAdjacentElement('beforeend', tr);
});