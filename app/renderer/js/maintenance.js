const ipcRenderer = window.app;

const fantasyNameOld = document.getElementById('fantasyName').value;
const businessNameOld = document.getElementById('businessName').value;
const taxNameOld = document.getElementById('taxName').value;
const taxPercentageOld = document.getElementById('taxPercentage').value;

async function editbusinessInfo () {
    const fantasyName = document.getElementById('fantasyName').value;
    const businessName = document.getElementById('businessName').value;
    const taxName = document.getElementById('taxName').value;
    const taxPercentage = document.getElementById('taxPercentage').value;

    if(fantasyName && businessName && taxName && taxPercentage){

        if(fantasyName == fantasyNameOld && businessName == businessNameOld && taxName == taxNameOld && taxPercentage == taxPercentageOld){
            const alertDiv = document.getElementById('alert');
            alertDiv.innerHTML = '';
            alertDiv.innerHTML = '<div class="alert alert-warning alert-dismissible " role="alert" style="width:85%"><button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="clearAlert();"><span aria-hidden="true">×</span></button><strong>Atención!</strong> No existe modificación en los datos</div>';
        
        } else {
            const response = await ipcRenderer.invoke('update-general-info', {
                fantasyName,
                businessName,
                taxName,
                taxPercentage, 
            });
            if(response) {
                document.getElementById('fantasyName').value = response.fantasyName;
                document.getElementById('businessName').value = response.businessName;
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