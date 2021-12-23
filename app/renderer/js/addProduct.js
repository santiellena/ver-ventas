const ipcRenderer = window.app;
let verifier;

function addProduct(){
    const form = document.getElementById('form');

    const id = document.getElementById('id-product').value;
    const description = document.getElementById('description-product').value;
    const buyPrice = document.getElementById('buyPrice-product').value;
    const wholesalerPrice = document.getElementById('wholesalerPrice-product').value;
    const unitPrice = document.getElementById('unitPrice-product').value;
    const initialStock = document.getElementById('initialStock-product').value;
    const departmentId = document.getElementById('department-product').value;
    const locationShowId = document.getElementById('locationShow-product').value;
    const locationStoreId = document.getElementById('locationStore-product').value;
    const unitMeasureId = document.getElementById('unitMeasure-product').value;

    if(verifier == false){
        ipcRenderer.send('new-product', {
            id,
            description,
            buyPrice,
            wholesalerPrice,
            unitPrice,
            initialStock,
            departmentId,
            locationShowId,
            locationStoreId,
            unitMeasureId,
        });
    
        form.reset();

        const feedback = document.getElementById('codeFeedback');
        
        feedback.setAttribute('style', 'display: inline-block; right: 17%;');
        feedback.setAttribute('class', 'fa fa-circle-thin form-control-feedback right');

    } else {
        const feedback = document.getElementById('codeFeedback');
        feedback.setAttribute('style', 'background: red; display: inline-block; right: 17%;');
    };
};

async function checkCodeValue () {
    const id = document.getElementById('id-product').value;

    const check = await ipcRenderer.invoke('check-product-existance', id);
    const feedback = document.getElementById('codeFeedback');

    if(check == true || id == ''){    

        feedback.setAttribute('class', 'fa fa-times-circle-o form-control-feedback right');
        verifier = true;
        console.log(verifier);
    } else {

        feedback.setAttribute('class', 'fa fa-check-circle-o form-control-feedback right');
        verifier = false; 
    }
};