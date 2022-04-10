const ipcRenderer = window.app;

function addEmplooy () {
    const name = document.getElementById('name').value;
    const lastname = document.getElementById('lastname').value;
    const docTypeId = document.getElementById('docType').value;
    const numDoc = document.getElementById('numDoc').value;
    const email = document.getElementById('email').value;
    const dirStreet = document.getElementById('dirStreet').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const birthDate = document.getElementById('date').value;

    if(name && lastname && docTypeId && numDoc && email && dirStreet && phoneNumber && birthDate){
        ipcRenderer.send('add-emplooy', {
            name,
            lastname,
            docTypeId,
            numDoc,
            email,
            dirStreet,
            phoneNumber,
            birthDate,
        });
    };
};