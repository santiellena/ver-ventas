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

async function loadCities() {
    const idDepartment = document.getElementById('dirDepto').value;
    const supplier = window.supplier;
    if(idDepartment){
        const cities = await ipcRenderer.invoke('get-cities-bydepartment', idDepartment);

        const selectCities = document.getElementById('city');
        selectCities.innerHTML = '';
        cities.map(e => {
            const option = document.createElement('option');

            option.value = e.id;
            option.setAttribute('id', e.nombre);
            option.innerText = e.nombre;
            if(supplier.dirCity == e.nombre){
                option.setAttribute('selected', true);
            };

            selectCities.appendChild(option);
        });
    };
};

async function loadDepartments () {
    
    const supplierId = window.supplier;
    const supplier = await ipcRenderer.invoke('get-supplier', supplierId);
    document.getElementById(supplier.docType).setAttribute('selected', true);
    document.getElementById(supplier.dirProv).setAttribute('selected', true);
    const idProvince = document.getElementById('dirProv').value;
    const departments = await ipcRenderer.invoke('get-departments-byprovince', idProvince);

    const selectDepartments = document.getElementById('dirDepto');
    selectDepartments.innerHTML = '';
    departments.map(e => {
        const option = document.createElement('option');

        option.value = e.id;
        option.innerText = e.nombre;
        option.setAttribute('id', e.nombre);

        if(supplier.dirDepto == e.nombre){
            option.setAttribute('selected', true);
        };

        selectDepartments.appendChild(option);
    });
    loadCities();
};
loadDepartments();