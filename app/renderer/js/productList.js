async function loadTaxPercentage() {
    const taxPercentage = await ipcRenderer.invoke('get-tax-percentage', '');

    const taxShower = document.getElementById('tax-percentage');
    taxShower.innerText = `Impuesto (%${taxPercentage})`;
};
loadTaxPercentage();

async function checkProductExistense(){
    const idProduct = document.getElementById('id-product').value;
    //const existence = await ipcRenderer.invoke('check-product-incookies', idProduct);
    const product = getItemSession(idProduct);

    if(product != null && product != undefined){
        let actualProductQuantity = document.getElementById(`quantArticle${idProduct}`).value;
        actualProductQuantity++;
        updateItemSession(idProduct, actualProductQuantity);

        const subTotal = document.getElementById(`sub-total${idProduct}`);
        const quantityInput = document.getElementById(`quantArticle${idProduct}`);
        const product = await ipcRenderer.invoke('search-product-byid', idProduct);
        if(checkPriceList() == 'public'){     
            const newSubTotal = product.unitPrice * actualProductQuantity;
            quantityInput.value = actualProductQuantity;
            subTotal.innerText = `$ ${newSubTotal}`;

        } else {
            const newSubTotal = product.wholesalerPrice * actualProductQuantity;
            quantityInput.value = actualProductQuantity;
            subTotal.innerText = `$ ${newSubTotal}`;

        }
        
        updateSubTotal();
        
    } else {
        addProduct();
    }
}

function loadProduct({ id, description, unitPrice, stock }) {
    const tbody = document.getElementById('tbody-list');
    const trAlert = document.getElementById('tr-alert');
    if(trAlert != null){
        trAlert.remove();
    }
    
    
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
    tdUnitPrice.setAttribute('id', `unitPrice${id}`);
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
        const { id, description, unitPrice, wholesalerPrice, stock } = product;
        setItemSession(id, quantity);

        if(checkPriceList() == 'public'){   
            loadProduct({ id, description, unitPrice, stock, quantity });
        } else {
            loadProduct({ id, description, unitPrice: wholesalerPrice, stock, quantity });
        }
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
    tbody.innerHTML = '';

    clearAllItemSession();

    const trAlert = document.createElement('tr');
    trAlert.setAttribute('class', 'odd');
    trAlert.setAttribute('id', 'tr-alert');
    const tdAlert = document.createElement('td');
    tdAlert.setAttribute('valign', 'top');
    tdAlert.setAttribute('colspan', '7');
    tdAlert.setAttribute('class', 'dataTables_empty');
    tdAlert.innerText = 'Ningún Producto Agregado';
    trAlert.appendChild(tdAlert);
    
    tbody.appendChild(trAlert);

    updateSubTotal();
};

async function updateTotal(subTotal) {
    const totalAmount = document.getElementById('total-amount');
    const tax = await ipcRenderer.invoke('get-tax-percentage', '');
    const taxAmount = tax / 100 * subTotal;
    const taxAmountShower = document.getElementById('tax-amount');
    taxAmountShower.innerText = `$ ${taxAmount.toFixed(2)}`;
    const newTotalAmount = subTotal + taxAmount;
    const newTotalWithoutComas = newTotalAmount.toFixed(2);
    totalAmount.value = newTotalWithoutComas;
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

    updateSubTotal();

    const allItems = getAllItemSession();

    if(allItems.length == 0){
        const tbody = document.getElementById('tbody-list');
        const trAlerted = document.getElementById('tr-alert');
    
        if(trAlerted != null){
            trAlerted.remove();
        }
        clearAllItemSession();
    
        const trAlert = document.createElement('tr');
        trAlert.setAttribute('class', 'odd');
        trAlert.setAttribute('id', 'tr-alert');
        const tdAlert = document.createElement('td');
        tdAlert.setAttribute('valign', 'top');
        tdAlert.setAttribute('colspan', '7');
        tdAlert.setAttribute('class', 'dataTables_empty');
        tdAlert.innerText = 'Ningún Producto Agregado';
        trAlert.appendChild(tdAlert);
        
        console.log('aa');
        tbody.appendChild(trAlert);
    };

};

function checkPriceList() {
    const selectInput = document.getElementById('price-list-select');

    if(selectInput.value == 'public'){
        return 'public';
    } else {
        return 'wholesaler';
    };
};

function updatePriceList() {
    const items = getAllItemSession();
    items.map(async e => {
        const id = e[0];
        const quantity = e[1];

        const product = await ipcRenderer.invoke('search-product-byid', id);
        const subTotalE = document.getElementById(`sub-total${id}`);
        const unitPriceE = document.getElementById(`unitPrice${id}`);

        if(checkPriceList() == 'public'){
            const newSubTotal = quantity * product.unitPrice;
            subTotalE.innerText = `$ ${newSubTotal}`;
            unitPriceE.innerText = `$ ${product.unitPrice}`;
        } else {
            const newSubTotal = quantity * product.wholesalerPrice;
            subTotalE.innerText = `$ ${newSubTotal}`;
            unitPriceE.innerText = `$ ${product.wholesalerPrice}`;
        }
        updateSubTotal();
    });
    
};

ipcRenderer.on('add-product-tosell-list', async () => {
    const idProduct = await ipcRenderer.invoke('get-id-forsell-list');
    const product = await ipcRenderer.invoke('search-product-byid', idProduct);
    const { id, description, stock, unitPrice, wholesalerPrice } = product;
    const sessionProduct = getItemSession(idProduct);
    if(sessionProduct != null && sessionProduct != undefined){
        let actualProductQuantity = document.getElementById(`quantArticle${idProduct}`).value;
        actualProductQuantity++;
        updateItemSession(idProduct, actualProductQuantity);

        const subTotal = document.getElementById(`sub-total${idProduct}`);
        const quantityInput = document.getElementById(`quantArticle${idProduct}`);

         if(checkPriceList() == 'public'){     
            const newSubTotal = product.unitPrice * actualProductQuantity;
            quantityInput.value = actualProductQuantity;
            subTotal.innerText = `$ ${newSubTotal}`;

        } else {
            const newSubTotal = product.wholesalerPrice * actualProductQuantity;
            quantityInput.value = actualProductQuantity;
            subTotal.innerText = `$ ${newSubTotal}`;
        }

        updateSubTotal();
    } else {
        const quantity = 1;
        setItemSession(idProduct, quantity);
        if(checkPriceList() == 'public'){

            loadProduct({id, description, stock, unitPrice, quantity});
        } else {

            loadProduct({id, description, stock, unitPrice: wholesalerPrice, quantity});   
        };
    }
    
});