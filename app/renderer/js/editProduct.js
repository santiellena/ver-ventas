const ipcRenderer = window.app;
let verifier;

function editProduct () {
    const form = document.getElementById('form');

    const id = document.getElementById('id-product').value;
    const description = document.getElementById('description-product').value;
    const buyPrice = document.getElementById('buyPrice-product').value;
    const wholesalerPrice = document.getElementById('wholesalerPrice-product').value;
    const unitPrice = document.getElementById('unitPrice-product').value;
    const stock = document.getElementById('stock-product').value;
    const departmentId = document.getElementById('department-product').value;
    const locationShowId = document.getElementById('locationShow-product').value;
    const locationStoreId = document.getElementById('locationStore-product').value;
    const unitMeasureId = document.getElementById('unitMeasure-product').value;

    if(verifier == true){
        ipcRenderer.send('edit-product', {
            id,
            description,
            buyPrice,
            wholesalerPrice,
            unitPrice,
            stock,
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
    if(check == false || id == null){    

        feedback.setAttribute('class', 'fa fa-times-circle-o form-control-feedback right');
        verifier = false;


    } else {

        feedback.setAttribute('class', 'fa fa-check-circle-o form-control-feedback right');
        verifier = true; 

        const id = document.getElementById('id-product').value;

        const product = await ipcRenderer.invoke('search-product-byid', id);

        if(product != null && product != undefined) {
            document.getElementById('description-product').value = product.description;
            document.getElementById('buyPrice-product').value = product.buyPrice;
            document.getElementById('wholesalerPrice-product').value = product.wholesalerPrice;
            document.getElementById('unitPrice-product').value = product.unitPrice;
            document.getElementById('stock-product').value = product.stock;
            document.getElementById(product.unitMeasure).setAttribute('selected', true);
            document.getElementById(product.department).setAttribute('selected', true);
            document.getElementById(product.location[0]).setAttribute('selected', true);
            document.getElementById(product.location[1]).setAttribute('selected', true);
        };
    }
};

ipcRenderer.on('confirm-product-edit', () => {
    window.close();
});