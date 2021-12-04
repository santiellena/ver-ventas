async function checkProductExistense(){
    const idProduct = document.getElementById('id-product').value;
    //const existence = await ipcRenderer.invoke('check-product-incookies', idProduct);
    const product = getItemSession(idProduct);

    if(product != null || product != undefined){
        let actualProductQuantity = document.getElementById(`quantArticle${idProduct}`).value;
        actualProductQuantity++;
        updateItemSession(idProduct, actualProductQuantity);

        const subTotal = document.getElementById(`sub-total${idProduct}`);
        const quantityInput = document.getElementById(`quantArticle${idProduct}`);
        const product = await ipcRenderer.invoke('search-product-byid', idProduct);
        const newSubTotal = product.unitPrice * actualProductQuantity;
        quantityInput.value = actualProductQuantity;
        subTotal.innerText = `$ ${newSubTotal}`;

        updateSubTotal();
        
    } else {
        addProduct();
    }
}

function loadProduct({ id, description, unitPrice, stock }) {
    const tbody = document.getElementById('tbody-list');

    document.getElementById('div-alert-list').innerHTML = '';

    const tr = document.createElement('tr');
    tr.setAttribute('id', `tr${id}`);
    const tdInputQuantity = document.createElement('td');
    const inputQuantity = document.createElement('input');
    inputQuantity.setAttribute('type', 'number');
    inputQuantity.setAttribute('id', `quantArticle${id}`);
    inputQuantity.setAttribute('class', 'form-control input-list');
    inputQuantity.setAttribute('name', `quantArticle${id}`);
    inputQuantity.setAttribute('value', 1);
    inputQuantity.setAttribute('required', 'true');
    inputQuantity.setAttribute('onkeydown', `updateAmountByInput(${id}); updateSubTotal();`);
    inputQuantity.setAttribute('onchange', `updateAmountByInput(${id}); updateSubTotal();`);
    tdInputQuantity.appendChild(inputQuantity);
    const tdDescription = document.createElement('td');
    const tdId = document.createElement('td');
    const tdStock = document.createElement('td');
    const tdUnitPrice = document.createElement('td');
    const tdSubTotal = document.createElement('td');
    tdSubTotal.setAttribute('id', `sub-total${id}`);
    const tdButton = document.createElement('td');
    const buttonDelete = document.createElement('button');
    buttonDelete.setAttribute('class', 'btn btn-danger');
    buttonDelete.setAttribute('onclick', `deleteProductList(${id});`)
    buttonDelete.innerText = 'X';
    tdButton.appendChild(buttonDelete);

    tdDescription.innerText = description;
    tdId.innerText = id;
    tdStock.innerText = stock;
    tdUnitPrice.innerText = `$ ${unitPrice}`;
    tdSubTotal.innerText = `$ ${unitPrice}`;

    tr.appendChild(tdInputQuantity);
    tr.appendChild(tdDescription);
    tr.appendChild(tdId);
    tr.appendChild(tdStock);
    tr.appendChild(tdUnitPrice);
    tr.appendChild(tdSubTotal);
    tr.appendChild(tdButton);

    tbody.appendChild(tr);

    updateSubTotal()

}

async function addProduct(){
    const idProduct = document.getElementById('id-product').value;
    const showProduct = document.getElementById('product-shower');

    const product = await ipcRenderer.invoke('search-product-byid', idProduct);

    if(product.id == null || product.id == undefined){
        showProduct.value = 'Producto no encontrado.'
    } else {
        const quantity = 1;
        const { id, description, unitPrice, stock } = product;
        setItemSession(id, quantity);
        loadProduct({ id, description, unitPrice, stock, quantity });
    }
}

document.getElementById('id-product').addEventListener('keydown', e => { 
    if(e.key == 'Enter'){
        checkProductExistense();
    }
});

async function searchProduct(){
    const showProduct = document.getElementById('product-shower');
    const idProduct = document.getElementById('id-product').value;

    const productData = await ipcRenderer.invoke('search-product-byid', idProduct);

    showProduct.value = productData.description ? productData.description : productData;
};

async function updateAmountByInput(id) {
    const input = document.getElementById(`quantArticle${id}`);
    const subTotal = document.getElementById(`sub-total${id}`);
    const product = await ipcRenderer.invoke('search-product-byid', id);
    const newSubTotal = input.value * product.unitPrice;

    updateItemSession(id, input.value);
    subTotal.innerText = `$ ${newSubTotal}`
};

function clearProductList() {
    const tbody = document.getElementById('tbody-list');
    const divAlert = document.getElementById('div-alert-list');

    divAlert.innerHTML = '';
    clearAllItemSession();

    const h3Alert = document.createElement('h3');
    divAlert.setAttribute('style', 'text-align: center');
    h3Alert.setAttribute('style', 'width: 50rem');
    h3Alert.innerText = 'Ningún Producto Agregado';

    tbody.innerHTML = '';

    divAlert.appendChild(h3Alert);

};

async function updateTotal(subTotal) {
    const totalAmount = document.getElementById('total-amount');
    const tax = await ipcRenderer.invoke('get-tax-percentage', '');
    const newTotalAmount = subTotal + (subTotal * tax);
    totalAmount.value = newTotalAmount;
};

function updateSubTotal() {
    const subTotalAmount = document.getElementById('subtotal-amount');

    const allItems = getAllItemSession();

    let newSubTotal = 0;

    allItems.map(e => {
        const id = e[0];

        const subTotal = document.getElementById(`sub-total${id}`);

        const justTheNumberString = subTotal.innerText.slice(2,);

        const justTheNumber = parseFloat(justTheNumberString);
        
        newSubTotal += justTheNumber;
    });

    subTotalAmount.value = newSubTotal;

    updateTotal(newSubTotal);
};

ipcRenderer.on('clear-product-list', () => {
    clearProductList();
    updateSubTotal();
});

function deleteProductList(id) {
    removeItemSession(id);

    const tr = document.getElementById(`tr${id}`);
    tr.remove();
};