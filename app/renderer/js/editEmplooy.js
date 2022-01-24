const ipcRenderer = window.app;

async function editEmplooy (id) {
    const name = document.getElementById('name').value;
    const lastname = document.getElementById('lastname').value;
    const docTypeId = document.getElementById('docType').value;
    const numDoc = document.getElementById('numDoc').value;
    const email = document.getElementById('email').value;
    const dirStreet = document.getElementById('dirStreet').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const birthDate = document.getElementById('date').value;
    const login = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if(name && lastname && docTypeId && numDoc && email && dirStreet && phoneNumber && birthDate && login && password){
        const update = await ipcRenderer.invoke('edit-emplooy', {
            id,
            name,
            lastname,
            docTypeId,
            numDoc,
            email,
            dirStreet,
            phoneNumber,
            birthDate,
            login, 
            password,
        });
        const alertDiv = document.getElementById('alert');
        if(update == null){
            alertDiv.innerHTML = '';
            alertDiv.innerHTML = '<div class="alert alert-danger alert-dismissible" role="alert" style="width:60%"><button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="clearAlert();"><span aria-hidden="true">×</span></button><strong>Error!</strong> 500 Internal. Servidor</div>';
        } else if(update == false){
            alertDiv.innerHTML = '';
            alertDiv.innerHTML = '<div class="alert alert-warning alert-dismissible " role="alert" style="width:60%"><button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="clearAlert();"><span aria-hidden="true">×</span></button><strong>Atención!</strong> No existe modificación en los datos</div>';
        } else if(update){
            document.getElementById('name').value = update.name;
            document.getElementById('lastname').value = update.lastname;
            const optionDoc = document.createElement('option');
            optionDoc.innerText = update.docType.description;
            optionDoc.value = update.docType.id;
            optionDoc.setAttribute('selected', true);
            document.getElementById('docType').appendChild(optionDoc);
            document.getElementById('numDoc').value = update.numDoc;
            document.getElementById('email').value = update.email;
            document.getElementById('dirStreet').value = update.dirStreet;
            document.getElementById('phoneNumber').value = update.phoneNumber;
            document.getElementById('date').value = update.birthDate;
            document.getElementById('username').value = update.username;
            document.getElementById('password').value = update.password;

            alertDiv.innerHTML = '';
            alertDiv.innerHTML = '<div class="alert alert-success alert-dismissible " role="alert" style="width:60%"><button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="clearAlert();"><span aria-hidden="true">×</span></button><strong>Éxito!</strong> Modificado Correctamente</div>';
        };
    };
};

function deleteEmplooy (id) {
    ipcRenderer.send('delete-emplooy', id);
};

function clearAlert () {
    const alertDiv = document.getElementById('alert');
    alertDiv.innerHTML = '';
};
