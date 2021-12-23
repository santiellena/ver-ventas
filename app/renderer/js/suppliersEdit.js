const ipcRenderer = window.app;

function deleteSupplier(id){
    if(id != undefined && id != null){
        ipcRenderer.send('delete-supplier', id);
        window.close();
    };
};

function editSupplierInfo(id){
    const supplierName = document.getElementById('name').value;
    const docType = document.getElementById('docType').value;
    const numDoc = document.getElementById('numDoc').value;
    const cuit = document.getElementById('cuit').value;
    const dirProv = document.getElementById('dirProv').value;
    const dirDepto = document.getElementById('dirDepto').value;
    const postCode = document.getElementById('postCode').value;
    const dirCity = document.getElementById('dirCity').value;
    const dirStreet = document.getElementById('dirStreet').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;
    const cbu = document.getElementById('cbu').value;

    ipcRenderer.send('edit-supplier-info', {
        id,
        supplierName,
        docType,
        numDoc,
        cuit,
        dirProv,
        dirDepto,
        postCode,
        dirCity,
        dirStreet,
        phoneNumber,
        email, 
        cbu,
    });
    
    window.close();
};