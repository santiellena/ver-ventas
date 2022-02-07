const ipcRenderer = window.app;

document.getElementById('button-login').addEventListener('click', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const divAlert = document.getElementById('alert');
    if(username && password){
        const answer = await ipcRenderer.invoke('login', {
            username,
            password,
        });
        if(answer == 'internal'){
            divAlert.innerHTML = `<div class="alert alert-danger alert-dismissible "  role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="clearAlert();"><span aria-hidden="true">×</span></button><strong>Error!</strong> Error interno, intente nuevamente</div>`;           
        } else if(answer){
           window.close();
        } else if(answer == null){
            divAlert.innerHTML = `<div class="alert alert-danger alert-dismissible "  role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="clearAlert();"><span aria-hidden="true">×</span></button><strong>Error!</strong> Datos ingresados incorrectos</div>`;
       } else if(answer == false){
            divAlert.innerHTML = `<div class="alert alert-warning alert-dismissible "  role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="clearAlert();"><span aria-hidden="true">×</span></button><strong>Atención!</strong> Los datos coinciden, pero no posee un usuario creado</div>`
       };
           
    } else {
        if(username && !password){
            document.getElementById('password').focus();
        } else if(!username && password){
            document.getElementById('username').focus();
        }
       divAlert.innerHTML = `<div class="alert alert-warning alert-dismissible "  role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="clearAlert();"><span aria-hidden="true">×</span></button><strong>Atención!</strong> Complete todos los campos</div>`;
    }
});

function clearAlert () {
    const alertDiv = document.getElementById('alert');
    alertDiv.innerHTML = '';
};

