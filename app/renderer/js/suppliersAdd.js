const ipcRenderer = window.app;

function addSupplier() {
    const supplierName = document.getElementById('name').value;
    const docType = document.getElementById('docType').value;
    const numDoc = document.getElementById('numDoc').value;
    const cuit = document.getElementById('cuit').value;
    const dirProv = document.getElementById('dirProv').value;
    const dirDepto = document.getElementById('dirDepto').value;
    const postCode = document.getElementById('postCode').value;
    const dirCity = document.getElementById('city').value;
    const dirStreet = document.getElementById('dirStreet').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;
    const cbu = document.getElementById('cbu').value;
    ipcRenderer.send('add-supplier', {
        supplierName,
        docType,
        numDoc,
        dirDepto,
        dirProv,
        dirPostCode: postCode,
        dirCity,
        dirStreet,
        cuit,
        phoneNumber,
        email,
        cbu,
    });
    window.close();
};

async function loadCities() {
    const idDepartment = document.getElementById('dirDepto').value;
    if(idDepartment){
        const cities = await ipcRenderer.invoke('get-cities-bydepartment', idDepartment);

        const selectCities = document.getElementById('city');
        selectCities.innerHTML = '';
        cities.map(e => {
            const option = document.createElement('option');

            option.value = e.id;
            option.innerText = e.nombre;

            selectCities.appendChild(option);
        });
    };
};

async function loadDepartments () {
    const idProvince = document.getElementById('dirProv').value;
    const departments = await ipcRenderer.invoke('get-departments-byprovince', idProvince);

    const selectDepartments = document.getElementById('dirDepto');
    selectDepartments.innerHTML = '';
    departments.map(e => {
        const option = document.createElement('option');

        option.value = e.id;
        option.innerText = e.nombre;

        selectDepartments.appendChild(option);
    });
    loadCities();
};
loadDepartments();
