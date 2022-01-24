const ipcRenderer = window.app;

const fantasyNameOld = document.getElementById('fantasyName').value;
const bussinesNameOld = document.getElementById('bussinesName').value;
const taxNameOld = document.getElementById('taxName').value;
const taxPercentageOld = document.getElementById('taxPercentage').value;

async function editBussinesInfo () {
    const fantasyName = document.getElementById('fantasyName').value;
    const bussinesName = document.getElementById('bussinesName').value;
    const taxName = document.getElementById('taxName').value;
    const taxPercentage = document.getElementById('taxPercentage').value;

    if(fantasyName && bussinesName && taxName && taxPercentage){

        if(fantasyName == fantasyNameOld && bussinesName == bussinesNameOld && taxName == taxNameOld && taxPercentage == taxPercentageOld){
            const alertDiv = document.getElementById('alert');
            alertDiv.innerHTML = '';
            alertDiv.innerHTML = '<div class="alert alert-warning alert-dismissible " role="alert" style="width:85%"><button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="clearAlert();"><span aria-hidden="true">×</span></button><strong>Atención!</strong> No existe modificación en los datos</div>';
        
        } else {
            const response = await ipcRenderer.invoke('update-general-info', {
                fantasyName,
                bussinesName,
                taxName,
                taxPercentage, 
            });
            if(response) {
                document.getElementById('fantasyName').value = response.fantasyName;
                document.getElementById('bussinesName').value = response.bussinesName;
                document.getElementById('taxName').value = response.taxName;
                document.getElementById('taxPercentage').value = response.taxPercentage;
            } else {
                const alertDiv = document.getElementById('alert');
                alertDiv.innerHTML = '';
                alertDiv.innerHTML = '<div class="alert alert-danger alert-dismissible" role="alert" style="width:85%"><button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="clearAlert();"><span aria-hidden="true">×</span></button><strong>Error!</strong> 500 Internal. Servidor</div>';
            };
        };
    };
};

function clearAlert () {
    const alertDiv = document.getElementById('alert');
    alertDiv.innerHTML = '';
};