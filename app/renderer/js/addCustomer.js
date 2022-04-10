const ipcRenderer = window.app;

async function loadCities() {
    const idDepartment = document.getElementById('department-customer').value;
    if(idDepartment){
        const cities = await ipcRenderer.invoke('get-cities-bydepartment', idDepartment);

        const selectCities = document.getElementById('city-customer');
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
    const idProvince = document.getElementById('province-customer').value;
    const departments = await ipcRenderer.invoke('get-departments-byprovince', idProvince);

    const selectDepartments = document.getElementById('department-customer');
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

function addCustomer () {
    const name = document.getElementById('name-customer').value;
    const idDocType = document.getElementById('docType-customer').value;
    const numDoc = document.getElementById('numDoc-customer').value;
    const cuit = document.getElementById('cuit-customer').value;
    const email = document.getElementById('email-customer').value;
    const phoneNumber = document.getElementById('phoneNumber-customer').value;
    const idDirProvince = document.getElementById('province-customer').value;
    const idDirDepartment = document.getElementById('department-customer').value;
    const dirPostCode = document.getElementById('postCode-customer').value;
    const idDirCity = document.getElementById('city-customer').value;
    const dirStreet = document.getElementById('street-customer').value;
    const initialDebt = document.getElementById('initialDebt-customer').value;

    ipcRenderer.send('add-customer', {
        name,
        idDocType,
        numDoc,
        cuit,
        email,
        phoneNumber,
        idDirProvince,
        idDirDepartment,
        dirPostCode,
        idDirCity,
        dirStreet,
        initialDebt,
    });

    const form = document.getElementById('form');
    form.reset();
};

ipcRenderer.on('confirm-added-customer', () => {
    window.close();
});