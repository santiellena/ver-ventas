const ipcRenderer = window.app

async function addUnitMeasure () {
    const newShortName = document.getElementById('new-short-measure').value;
    const newLongName = document.getElementById('new-long-measure').value;

    const newUnitMeasure = await ipcRenderer.invoke('new-unitMeasure', {longDescription: newLongName, shortDescription: newShortName});

    const tbody = document.getElementById('tbody-measures');

    if(newUnitMeasure){
        const tr = document.createElement('tr');
        tr.setAttribute('id', `tr${newUnitMeasure.id}`);
        const tdId = document.createElement('td');
        tdId.innerText = newUnitMeasure.id;
        const tdName = document.createElement('td');
        tdName.innerText = `${newUnitMeasure.shortDescription} - ${newUnitMeasure.longDescription}`;
        const tdButton = document.createElement('td');
        const button = document.createElement('button');
        button.setAttribute('class', 'btn btn-danger');
        button.setAttribute('onclick', `deleteUnitMeasure(${newUnitMeasure.id})`);
        button.innerText = 'X';
        tdButton.appendChild(button);

        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdButton);

        tbody.insertAdjacentElement('beforeend', tr);

        document.getElementById('new-long-measure').value = null;
        document.getElementById('new-short-measure').value = null;
    };
};

function deleteUnitMeasure (id) {
    ipcRenderer.send('delete-unitMeasure', id);

    const tr = document.getElementById(`tr${id}`);
    tr.remove();
};