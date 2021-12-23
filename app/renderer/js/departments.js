const ipcRenderer = window.app

async function addDepartment () {
    const newName = document.getElementById('new-department').value;

    const newDepartment = await ipcRenderer.invoke('new-department', newName);

    const tbody = document.getElementById('tbody-departments');

    if(newDepartment){
        const tr = document.createElement('tr');
        tr.setAttribute('id', `tr${newDepartment.id}`);
        const tdId = document.createElement('td');
        tdId.innerText = newDepartment.id;
        const tdName = document.createElement('td');
        tdName.innerText = newDepartment.description;
        const button = document.createElement('button');
        button.setAttribute('class', 'btn btn-danger');
        button.setAttribute('onclick', `deleteDepartment(${newDepartment.id})`);
        button.innerText = 'X';

        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(button);

        tbody.insertAdjacentElement('beforeend', tr);

        document.getElementById('new-department').value = null;
    };
};

function deleteDepartment (id) {
    ipcRenderer.send('delete-department', id);

    const tr = document.getElementById(`tr${id}`);
    tr.remove();
};