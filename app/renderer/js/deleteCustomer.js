const ipcRenderer = window.app;
let verifier = false;

async function checkCodeValue () {
    const id = document.getElementById('id-product').value;

    const check = await ipcRenderer.invoke('check-customer-existance', id);
    const feedback = document.getElementById('codeFeedback');

    if(check == false || id == ''){    

        feedback.setAttribute('class', 'fa fa-times-circle-o form-control-feedback right');
        verifier = false;
    } else {

        feedback.setAttribute('class', 'fa fa-check-circle-o form-control-feedback right');
        verifier = true; 
    }
};

function deleteCustomer () {
    const id = document.getElementById('id-product').value;

    if(verifier == true && id){

        ipcRenderer.send('delete-customer', id);
    };
};

ipcRenderer.on('confirm-customer-delete', () => {
    window.close();
});