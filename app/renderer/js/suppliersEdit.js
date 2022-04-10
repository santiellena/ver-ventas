const ipcRenderer = window.app;

function deleteSupplier(id){
    if(id != undefined && id != null){
        ipcRenderer.send('delete-supplier', id);
        window.close();
    };
};

function editSupplierInfo(id){
    const supplierName = document.getElementById('name').value;
    const idDocType = document.getElementById('docType').value;
    const numDoc = document.getElementById('numDoc').value;
    const cuit = document.getElementById('cuit').value;
    const idDirProvince = document.getElementById('dirProvince').value;
    const idDirDepartment = document.getElementById('dirDepartment').value;
    const idDirPostCode = document.getElementById('postCode').value;
    const idDirCity = document.getElementById('dirCity').value;
    const dirStreet = document.getElementById('dirStreet').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;
    const cbu = document.getElementById('cbu').value;

    ipcRenderer.send('edit-supplier-info', {
        id,
        supplierName,
        idDocType,
        numDoc,
        cuit,
        idDirProvince,
        idDirDepartment,
        idDirPostCode,
        idDirCity,
        dirStreet,
        phoneNumber,
        email, 
        cbu,
    });
    
    window.close();
};

async function loadCities() {
    const idDepartment = document.getElementById('dirDepartment').value;
    const supplier = window.supplier;
    if(idDepartment){
        const cities = await ipcRenderer.invoke('get-cities-bydepartment', idDepartment);

        const selectCities = document.getElementById('dirCity');
        selectCities.innerHTML = '';
        cities.map(e => {
            const option = document.createElement('option');

            option.value = e.id;
            option.setAttribute('id', e.nombre);
            option.innerText = e.nombre;
            if(supplier.idDirCity == e.nombre){
                option.setAttribute('selected', true);
            };

            selectCities.appendChild(option);
        });
    };
};

async function loadDepartments () {
    
    const supplierId = window.supplier;
    const supplier = await ipcRenderer.invoke('get-supplier', supplierId);
    document.getElementById(supplier.docType.description).setAttribute('selected', true);
    document.getElementById(supplier.dirProvince).setAttribute('selected', true);
    const idProvince = document.getElementById('dirProvince').value;
    const departments = await ipcRenderer.invoke('get-departments-byprovince', idProvince);

    const selectDepartments = document.getElementById('dirDepartment');
    selectDepartments.innerHTML = '';
    for (const e of departments) {
        const option = document.createElement('option');

        option.value = e.id;
        option.innerText = e.nombre;
        option.setAttribute('id', e.nombre);

        if(supplier.dirDepartment == e.nombre){
            option.setAttribute('selected', true);
        };

        selectDepartments.appendChild(option);
    };
    await loadCities();
};
loadDepartments();