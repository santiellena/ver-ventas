const ipcRenderer = window.app;

function changeSelected(idNew, nameNew) {
    document.getElementById(idBranch).setAttribute('class', 'nav-link');
    document.getElementById(nameBranch).setAttribute('class', 'tab-pane fade');

    document.getElementById(nameNew).setAttribute('class', 'tab-pane fade show active');
    document.getElementById(idNew).setAttribute('class', 'nav-link active');

    idBranch = idNew;
    nameBranch = nameNew;
};

async function editBranchInfo (idBranch) {
    const branchName = document.getElementById(`branchName${idBranch}`).value;
    const cuit = document.getElementById(`cuit${idBranch}`).value;
    const dirStreet = document.getElementById(`dirStreet${idBranch}`).value;
    const phoneNumber = document.getElementById(`phoneNumber${idBranch}`).value;
    const email = document.getElementById(`email${idBranch}`).value;
    const representative = document.getElementById(`representative${idBranch}`).value;

    if(branchName && cuit && dirStreet && phoneNumber && email && representative){
        const update = await ipcRenderer.invoke('update-branch-info', {
            idBranch,
            branchName,
            cuit,
            dirStreet,
            phoneNumber,
            email,
            representative,
        });

        const alertDiv = document.getElementById('alert');

        if(update == null) {       
            alertDiv.innerHTML = '';
            alertDiv.innerHTML = '<div class="alert alert-danger alert-dismissible" role="alert" style="width:85%"><button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="clearAlert();"><span aria-hidden="true">×</span></button><strong>Error!</strong> 500 Internal. Servidor</div>';
        } else if(update == false){
            alertDiv.innerHTML = '';
            alertDiv.innerHTML = '<div class="alert alert-warning alert-dismissible " role="alert" style="width:85%"><button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="clearAlert();"><span aria-hidden="true">×</span></button><strong>Atención!</strong> No existe modificación en los datos</div>';
        } else if(update) {
            document.getElementById(`branchName${idBranch}`).value = update.name;
            document.getElementById(`cuit${idBranch}`).value = update.cuit;
            document.getElementById(`dirStreet${idBranch}`).value = update.dirStreet;
            document.getElementById(`phoneNumber${idBranch}`).value = update.phoneNumber;
            document.getElementById(`email${idBranch}`).value = update.email;
            document.getElementById(`representative${idBranch}`).value = update.representative;

            alertDiv.innerHTML = '';
            alertDiv.innerHTML = '<div class="alert alert-success alert-dismissible " role="alert" style="width:85%"><button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="clearAlert();"><span aria-hidden="true">×</span></button><strong>Éxito!</strong> Modificado Correctamente</div>';
        };
    };
};

function clearAlert () {
    const alertDiv = document.getElementById('alert');
    alertDiv.innerHTML = '';
};