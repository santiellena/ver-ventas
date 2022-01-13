const ipcRenderer = window.app;

async function checkServer () {
    const url = document.getElementById('url').value;
    const valid = /^(ftp|http|https):\/\/[^ "]+$/.test(url);
    const alertDiv = document.getElementById('alert');

    if(valid && url){
        const data = await ipcRenderer.invoke('check-url', url);

        if(data != null){

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

function loadServerData ({ businessName, branchs}) {
    if(businessName && branchs){
        const content = document.getElementById('content');
        content.innerHTML = '';

        const mainDiv = document.createElement('div')

    };
};