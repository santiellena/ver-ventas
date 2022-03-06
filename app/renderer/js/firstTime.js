const ipcRenderer = window.app;
let branchesPivot;

async function checkServer () {
    const url = document.getElementById('url').value;
    const valid = /^(ftp|http|https):\/\/[^ "]+$/.test(url);
    const alertDiv = document.getElementById('alert');

    if(valid && url){
        const data = await ipcRenderer.invoke('check-url', url);
        
        if(data != null){
            loadServerData({businessName: data.businessName, branches: data.branches});
        } else {
            alertDiv.innerHTML = '';
    alertDiv.innerHTML = '<div class="alert alert-danger alert-dismissible " role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="clearAlert();"><span aria-hidden="true">×</span></button><strong>Error!</strong> La URL ingresada no coincide con ningún servidor accesable</div>'
        };
    } else {
        alertDiv.innerHTML = '<div class="alert alert-warning alert-dismissible " role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="clearAlert();"><span aria-hidden="true">×</span></button><strong>Atención!</strong> Debe ser una URL lo ingresado</div>'
    };
};

function clearAlert () {
    const alertDiv = document.getElementById('alert');
    alertDiv.innerHTML = '';
};

function loadServerData ({ businessName, branches}) {
    if(businessName && branches){
        branchesPivot = branches;
        const content = document.getElementById('content');
        content.innerHTML = '';
        console.log('IN IF SVDATA');
        const mainDiv = document.createElement('div');
        mainDiv.setAttribute('style', 'display: flex; justify-content: center; flex-direction: column;');
        const divTitle = document.createElement('div');
        const title = document.createElement('h3');
        divTitle.appendChild(title);
        title.setAttribute('class', 'lead')
        title.innerText = `Servidor: ${businessName}`;
        mainDiv.appendChild(divTitle);

        if(branches.length > 0) {
            let radios = '';
            branches.map(branch => {
                const newRadio = `<div class="radio">
                <label for="${branch.name}">
                    <input type="radio" checked="" value="${branch.id}" id="${branch.name}" name="optionsRadios"> 
                    ${branch.name}, ${branch.dirStreet}</label>
                </div>`;

                radios = radios + newRadio;
            });
            const formRadios = document.createElement('form');
            formRadios.setAttribute('id', 'form');

            const divRadios = document.createElement('div');
            divRadios.innerHTML = radios;
            divRadios.setAttribute('style', 'margin-top: 1.5rem; margin-bottom: 1.5rem;');
            formRadios.appendChild(divRadios);
            mainDiv.appendChild(formRadios);

            const subTitle = document.createElement('p');
            subTitle.innerText = '(Seleccione la sucursal donde usará este dispositivo como punto de venta)';
            divTitle.appendChild(subTitle);

            const divInput = document.createElement('div');
            divInput.setAttribute('style', 'display:flex;');
            divInput.innerHTML = `<div class="input-group" style="width: 60%;">
            <input type="text" class="form-control" id="token" placeholder="Clave de Acceso">
            <span class="input-group-btn">
                <button type="button" class="btn btn-success" onclick="tokenValidation();">Validar</button>
            </span>
            </div>`;

            mainDiv.appendChild(divInput);

            const alertDiv = document.createElement('div');
            alertDiv.setAttribute('id', 'alert');

            mainDiv.appendChild(alertDiv);
        } else {
            const subTitle = document.createElement('p');
            subTitle.innerText = '(Sin existencia de sucursales, por favor rellene el formulario)';
            divTitle.appendChild(subTitle);
        };

        content.appendChild(mainDiv);

    };
};

async function tokenValidation () {
    const token = document.getElementById('token').value;
    let branchChecked;
   for (const e of branchesPivot) {
    if(document.getElementById(e.name).checked == true){
        branchChecked = e.id;
        break;
    };
   };
    if(token){
        const response = await ipcRenderer.invoke('join-branch', {token, idBranch: branchChecked});

        if(response == null) {
            const alertToken = document.getElementById('alert');
            alertToken.setAttribute('id', 'alert');
            alertToken.innerHTML ='<div class="alert alert-danger alert-dismissible " role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="clearAlert();"><span aria-hidden="true">×</span></button><strong>Error!</strong> Clave de acceso incorrecta</div>';
        };
    };
};