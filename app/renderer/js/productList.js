async function loadTaxPercentage() {
    const taxPercentage = await ipcRenderer.invoke('get-tax-percentage', '');
    window.taxPercentage = taxPercentage;
    const taxShower = document.getElementById('tax-percentage');
    taxShower.innerText = `Impuesto (%${window.taxPercentage})`;
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
        const discountElement = document.getElementById(`discount${idProduct}`);
        const product = await ipcRenderer.invoke('search-product-byid', idProduct);
        if(checkPriceList() == 'public'){
            let newSubTotal = 0;
            if(product.onSale == 1){
                const discount = await ipcRenderer.invoke('get-product-discount', idProduct);
                newSubTotal = actualProductQuantity * product.unitPrice - discount * actualProductQuantity;
                discountElement.innerText = `$ ${discount * actualProductQuantity}`;
            } else {
                newSubTotal = actualProductQuantity * product.unitPrice;
                discountElement.innerText = `$ 0`;
            };
            quantityInput.value = actualProductQuantity;
            subTotal.innerText = `$ ${newSubTotal}`;

        } else {
            let newSubTotal = 0;
            if(product.onSale == 1){
                if(checkPriceList() == 'public'){
                    const discount = await ipcRenderer.invoke('get-product-discount', id);
                    newSubTotal = actualProductQuantity * product.unitPrice - discount * actualProductQuantity;
                    discountElement.innerText = `$ ${discount * actualProductQuantity}`;
                } else {
                    newSubTotal = actualProductQuantity * product.wholesalerPrice;
                    discountElement.innerText = `$ 0`;
                };
            } else {
                if(checkPriceList() == 'public'){
                    newSubTotal = actualProductQuantity * product.unitPrice;
                    discountElement.innerText = `$ 0`;
                } else {
                    newSubTotal = actualProductQuantity * product.wholesalerPrice;
                    discountElement.innerText = `$ 0`;
                };
            };
            quantityInput.value = actualProductQuantity;
            subTotal.innerText = `$ ${newSubTotal}`;

        }
        
        updateSubTotal();
        
    } else {
        addProduct();
    }
}

function loadProduct({ id, description, unitPrice, stock, discount }) {
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
    const tdDiscount = document.createElement('td');
    tdDiscount.setAttribute('id', `discount${id}`)
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
    tdDiscount.innerText = `$ ${discount}`;
    tdSubTotal.innerText = `$ ${unitPrice - discount}`;

    tr.appendChild(tdInputQuantity);
    tr.appendChild(tdDescription);
    tr.appendChild(tdId);
    tr.appendChild(tdStock);
    tr.appendChild(tdUnitPrice);
    tr.appendChild(tdDiscount);
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

        let discount = 0;
        if(product.onSale == 1){
            if(checkPriceList() == 'public'){
                discount = await ipcRenderer.invoke('get-product-discount', product.id);
            };
        };

        if(checkPriceList() == 'public'){   
            loadProduct({ id, description, unitPrice, stock, quantity, discount });
        } else {
            loadProduct({ id, description, unitPrice: wholesalerPrice, stock, quantity, discount });
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
    const discountElement = document.getElementById(`discount${id}`);
    const product = await ipcRenderer.invoke('search-product-byid', id);
    let newSubTotal = 0;
    if(product.onSale == 1){
        if(checkPriceList() == 'public'){
            const discount = await ipcRenderer.invoke('get-product-discount', id);
            newSubTotal = input.value * product.unitPrice - discount * input.value;
            discountElement.innerText = `$ ${discount * input.value}`;
        } else {
            newSubTotal = input.value * product.wholesalerPrice;
            discountElement.innerText = `$ 0`;
        };
    } else {
        if(checkPriceList() == 'public'){
            newSubTotal = input.value * product.unitPrice;
        } else {
            newSubTotal = input.value * product.wholesalerPrice;
        };
        discountElement.innerText = `$ 0`;
    };

    updateItemSession(id, input.value);
    subTotal.innerText = `$ ${newSubTotal}`;
    updateSubTotal();
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
    tdAlert.setAttribute('colspan', '8');
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
        tdAlert.setAttribute('colspan', '8');
        tdAlert.setAttribute('class', 'dataTables_empty');
        tdAlert.innerText = 'Ningún Producto Agregado';
        trAlert.appendChild(tdAlert);
        
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
        const discountElement = document.getElementById(`discount${id}`);
        let discount = 0;
        if(checkPriceList() == 'public'){
            if(product.onSale == 1){
                discount = await ipcRenderer.invoke('get-product-discount', id);
            };
            const newSubTotal = quantity * product.unitPrice - discount * quantity;
            subTotalE.innerText = `$ ${newSubTotal}`;
            unitPriceE.innerText = `$ ${product.unitPrice}`;
            discountElement.innerText = `$ ${discount * quantity}`;

        } else {
            const newSubTotal = quantity * product.wholesalerPrice;
            subTotalE.innerText = `$ ${newSubTotal}`;
            unitPriceE.innerText = `$ ${product.wholesalerPrice}`;
            discountElement.innerText = `$ 0`;
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
        const discountElement = document.getElementById(`discount${idProduct}`);
        let discount = 0;

         if(checkPriceList() == 'public'){
             if(product.onSale == 1) {
                discount = await ipcRenderer.invoke('get-product-discount', id);
             };
            const newSubTotal = product.unitPrice * actualProductQuantity - discount * actualProductQuantity;
            quantityInput.value = actualProductQuantity;
            subTotal.innerText = `$ ${newSubTotal}`;
            discountElement.innerText = `$ ${discount * actualProductQuantity}`;

        } else {
            const newSubTotal = product.wholesalerPrice * actualProductQuantity;
            quantityInput.value = actualProductQuantity;
            subTotal.innerText = `$ ${newSubTotal}`;
            discountElement.innerText = '$ 0';
        }

        updateSubTotal();
    } else {
        const quantity = 1;
        let discount = 0;
        setItemSession(idProduct, quantity);
        if(product.onSale == 1){
            if(checkPriceList() == 'public'){
                discount = await ipcRenderer.invoke('get-product-discount', product.id);
            };
        };
        if(checkPriceList() == 'public'){

            loadProduct({id, description, stock, unitPrice, quantity, discount});
        } else {

            loadProduct({id, description, stock, unitPrice: wholesalerPrice, quantity, discount});   
        };
    };
    
});

ipcRenderer.on('get-sells-details', () => {
    const sessionStorage = getAllItemSession();
    const priceList = document.getElementById('price-list-select').value;
    ipcRenderer.send('get-sells-details', {sessionStorage, priceList});
});

ipcRenderer.on('get-sells-details-card', () => {
    const sessionStorage = getAllItemSession();
    const priceList = document.getElementById('price-list-select').value;
    ipcRenderer.send('get-sells-details-card', {sessionStorage, priceList});
});

ipcRenderer.on('get-sells-details-credit', () => {
    const sessionStorage = getAllItemSession();
    const priceList = document.getElementById('price-list-select').value;
    ipcRenderer.send('get-sells-details-credit', {sessionStorage, priceList});
});

ipcRenderer.on('get-sells-details-order', () => {
    const sessionStorage = getAllItemSession();
    const priceList = document.getElementById('price-list-select').value;
    ipcRenderer.send('get-sells-details-order', {sessionStorage, priceList});
});