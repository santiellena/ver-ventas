const ipcRenderer = window.app;
let verifier = false;

function clearAlert () {
    const alertDiv = document.getElementById('alert');
    alertDiv.innerHTML = '';
};

async function addSale () {
    const form = document.getElementById('form');

    const id = document.getElementById('id-product').value;
    const discount = document.getElementById('discount').value;
    const toDate = document.getElementById('to-date').value;
    const fromDate = document.getElementById('from-date').value;

    if(verifier == true && id && discount && toDate && fromDate) {
        const answer = await ipcRenderer.invoke('add-sale', {
            idProduct: id,
            discount,
            fromDate,
            toDate,
        });

        form.reset();

        const feedback = document.getElementById('codeFeedback');
        
        feedback.setAttribute('style', 'display: inline-block; right: 17%;');
        feedback.setAttribute('class', 'fa fa-circle-thin form-control-feedback right');

        const alertDiv = document.getElementById('alert');

        if(answer){
            alertDiv.innerHTML = '<div class="alert alert-success alert-dismissible "  role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="clearAlert();"><span aria-hidden="true">×</span></button><strong>Éxito!</strong> Oferta agregada correctamente</div>';
        } else {
            alertDiv.innerHTML = '<div class="alert alert-danger alert-dismissible "  role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="clearAlert();"><span aria-hidden="true">×</span></button><strong>Error!</strong> No se pudo agregar la oferta</div>';
        };
    } else {
        const feedback = document.getElementById('codeFeedback');
        feedback.setAttribute('style', 'background: red; display: inline-block; right: 17%;');
    };
};

async function checkCodeValue () {
    const id = document.getElementById('id-product').value;

    const check = await ipcRenderer.invoke('check-product-existance', id);
    const feedback = document.getElementById('codeFeedback');
    const descriptionProduct = document.getElementById('description-product');
    const unitPrice = document.getElementById('unitPrice-product');

    if(check ==  false || id == ''){    

        feedback.setAttribute('class', 'fa fa-times-circle-o form-control-feedback right');
        verifier = false;
        descriptionProduct.value = '';
        unitPrice.value = '';
    } else {

        feedback.setAttribute('class', 'fa fa-check-circle-o form-control-feedback right');
        verifier = true; 

        const product = await ipcRenderer.invoke('search-product-byid', id);
        descriptionProduct.value = product.description;
        unitPrice.value = product.unitPrice;
    };
};


