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

async function checkIdValue () {
    const id = document.getElementById('id-customer').value;

    const check = await ipcRenderer.invoke('check-customer-existance', id);
    const feedback = document.getElementById('codeFeedback');

    if(check == true && id != ''){    

        feedback.setAttribute('class', 'fa fa-times-circle-o form-control-feedback right');
        verifier = true;
    } else {

        feedback.setAttribute('class', 'fa fa-check-circle-o form-control-feedback right');
        verifier = false; 
    };
};
checkIdValue();

function addCustomer () {
    const id = document.getElementById('id-customer').value;
    const name = document.getElementById('name-customer').value;
    const docType = document.getElementById('docType-customer').value;
    const numDoc = document.getElementById('numDoc-customer').value;
    const cuit = document.getElementById('cuit-customer').value;
    const email = document.getElementById('email-customer').value;
    const phoneNumber = document.getElementById('phoneNumber-customer').value;
    const province = document.getElementById('province-customer').value;
    const department = document.getElementById('department-customer').value;
    const postCode = document.getElementById('postCode-customer').value;
    const city = document.getElementById('city-customer').value;
    const street = document.getElementById('street-customer').value;
    const initialDebt = document.getElementById('initialDebt-customer').value;

    ipcRenderer.send('add-customer', {
        id,
        name,
        docType,
        numDoc,
        cuit,
        email,
        phoneNumber,
        province,
        department,
        postCode,
        city,
        street,
        initialDebt,
    });

    const form = document.getElementById('form');
    form.reset();
};

ipcRenderer.on('confirm-added-customer', () => {
    window.close();
});