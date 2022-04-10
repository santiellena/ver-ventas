const ipcRenderer = window.app;
let verifier = false;

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

async function checkIdValue () {
    const id = document.getElementById('id-customer').value;

    const check = await ipcRenderer.invoke('check-customer-existance', id);
    const feedback = document.getElementById('codeFeedback');
    const form = document.getElementById('form');

    if(check == false || id == ''){    

        feedback.setAttribute('class', 'fa fa-times-circle-o form-control-feedback right');
        verifier = false;

        form.reset()
        document.getElementById('id-customer').value = id;

    } else {
        feedback.setAttribute('class', 'fa fa-check-circle-o form-control-feedback right');
        verifier = true; 

        const customer = await ipcRenderer.invoke('get-customer', id);

        document.getElementById('id-customer').value = customer.id;
        document.getElementById('name-customer').value = customer.name;
        const docTypeSelect = document.getElementById('docType-customer');
        const optionDocType = document.createElement('option');
        optionDocType.value = customer.docType.id;
        optionDocType.innerText = customer.docType.description;
        optionDocType.setAttribute('selected', true);
        docTypeSelect.appendChild(optionDocType);
        document.getElementById('numDoc-customer').value = customer.numDoc;
        document.getElementById('cuit-customer').value = customer.cuit;
        document.getElementById('email-customer').value = customer.email;
        document.getElementById('phoneNumber-customer').value = customer.phoneNumber;
        const selectProv = document.getElementById('province-customer');
        const optionProv = document.createElement('option');
        optionProv.value = customer.dirProvince.id;
        optionProv.innerText = customer.dirProvince.nombre;
        optionProv.setAttribute('selected', true);
        selectProv.appendChild(optionProv);
        const selectDepto = document.getElementById('department-customer');
        const optionDepto = document.createElement('option');
        optionDepto.value = customer.dirDepartment.id;
        optionDepto.innerText = customer.dirDepartment.nombre;
        optionDepto.setAttribute('selected', true);
        selectDepto.appendChild(optionDepto);
        document.getElementById('postCode-customer').value = customer.dirPostCode;
        const selectCity = document.getElementById('city-customer');
        const optionCity = document.createElement('option');
        optionCity.value = customer.dirCity.id;
        optionCity.innerText = customer.dirCity.nombre;
        optionCity.setAttribute('selected', true);
        selectCity.appendChild(optionCity);
        document.getElementById('street-customer').value = customer.dirStreet;
        document.getElementById('debts-customer').value = customer.debt;
    };
};
checkIdValue();

function editCustomer () {
    if(verifier == true){
        const id = document.getElementById('id-customer').value;
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
        const debt = document.getElementById('debts-customer').value;

        if(id && name && idDocType && numDoc && cuit && email && phoneNumber && idDirProvince && idDirDepartment && dirPostCode && idDirCity && dirStreet && debt){
            ipcRenderer.send('edit-customer', {
                id,
                name,
                idDocType,
                numDoc,
                cuit,
                email,
                phoneNumber,
                idDirProvince,
                dirPostCode,
                idDirDepartment,
                idDirCity,
                dirStreet,
                debt
            });

            const form = document.getElementById('form');
            form.reset();
        };
    };
};

ipcRenderer.on('confirm-edited-customer', () => {
    window.close();
});