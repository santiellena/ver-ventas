const ipcRenderer = window.app;
let verifier;

async function checkCodeValue () {
    const id = document.getElementById('id-product').value;

    const check = await ipcRenderer.invoke('check-product-existance', id);
    const feedback = document.getElementById('codeFeedback');

    if(check == false || id == ''){    

        feedback.setAttribute('class', 'fa fa-times-circle-o form-control-feedback right');
        verifier = false;
    } else {

        feedback.setAttribute('class', 'fa fa-check-circle-o form-control-feedback right');
        verifier = true; 
    }
};

function deleteProduct () {
    if(verifier == true){
        const id = document.getElementById('id-product').value;

        ipcRenderer.send('delete-product', id);
    };
};

ipcRenderer.on('confirm-product-delete', () => {
    document.getElementById('id-product').value = null;
});

document.getElementById('id-product').addEventListener('keydown', e => { 
    if(verifier == true){
        const id = document.getElementById('id-product').value;

        ipcRenderer.send('delete-product', id);
    };
});