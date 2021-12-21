const ipcRenderer = window.app;

async function searchProduct() {
    const showProduct = document.getElementById('product-shower');
    const idProduct = document.getElementById('id-product').value;

    const productData = await ipcRenderer.invoke('search-product-byid', idProduct);

    showProduct.value = productData.description ? productData.description : productData;
};

function loadProduct({ id, description, buyPrice, wholesalerPrice, unitPrice, quantity }) {
    const alert = document.getElementById('tr-alert');
    if(alert != null){
        alert.remove();
    };
    const tbody = document.getElementById('tbody-buy');

    const tr = document.createElement('tr');
    tr.setAttribute('id', `tr${id}`);
    const tdId = document.createElement('td');
    tdId.innerText = id;
    const tdDescription = document.createElement('td');
    tdDescription.innerText = description;
    const tdBuyPrice = document.createElement('td');
    tdBuyPrice.innerText = `$ ${buyPrice}`;
    const tdWholesalerPrice = document.createElement('td');
    tdWholesalerPrice.innerText = `$ ${wholesalerPrice}`;
    const tdUnitPrice = document.createElement('td');
    tdUnitPrice.innerText = `$ ${unitPrice}`;
    const tdQuantity = document.createElement('td');
    tdQuantity.innerText = quantity;
    const tdButton = document.createElement('td');
    const button = document.createElement('button');
    button.innerText = 'ELIMINAR';
    button.setAttribute('class', 'btn btn-danger');
    button.setAttribute('type', 'button');
    button.setAttribute('onclick', `deleteProductBuy(${id})`);

    tdButton.appendChild(button);

    tr.appendChild(tdId);
    tr.appendChild(tdDescription);
    tr.appendChild(tdBuyPrice);
    tr.appendChild(tdWholesalerPrice);
    tr.appendChild(tdUnitPrice);
    tr.appendChild(tdQuantity);
    tr.appendChild(tdButton);

    tbody.insertAdjacentElement('beforeend', tr);
};

async function addProduct() {
    const idProduct = document.getElementById('id-product').value;

    const showProduct = document.getElementById('product-shower');

    const product = await ipcRenderer.invoke('search-product-byid', idProduct);

    if(product.id == null || product.id == undefined){
        showProduct.value = 'Producto no encontrado.'
    } else {
        const quantity = document.getElementById('quantity-product').value;
        const buyPrice = document.getElementById('priceSupplier-product').value;
        const wholesalerPrice = document.getElementById('wholesaler-price').value;
        const unitPrice = document.getElementById('unit-price').value;
        if(quantity != null && quantity != undefined && quantity != '' && buyPrice != null && buyPrice != undefined && buyPrice != ''){
            const quantityANDprices = `${quantity}-${buyPrice}/${wholesalerPrice}_${unitPrice}`;
            const { id, description } = product;
            setItemSession(id, quantityANDprices);
        
            loadProduct({ id, description, buyPrice, wholesalerPrice, unitPrice, quantity });

            document.getElementById('quantity-product').value = null;
            document.getElementById('priceSupplier-product').value = null;
            document.getElementById('wholesaler-price').value = null;
            document.getElementById('unit-price').value = null;
            document.getElementById('id-product').value = null;
            document.getElementById('product-shower').value = 'Producto';
        };
    };
};

async function checkProductExistense(){
    const idProduct = document.getElementById('id-product').value;
    const product = getItemSession(idProduct);

    if(product != null && product != undefined){
        alert('Producto ya agregado...');
    } else {
        addProduct();
    };
}

document.getElementById('id-product').addEventListener('keydown', e => { 
    if(e.key == 'Enter'){
        checkProductExistense();
    }
});

function deleteProductBuy(id){
    const tr = document.getElementById(`tr${id}`);
    removeItemSession(id);
    tr.remove();
};

document.getElementById('search-product-button').addEventListener('click', ()=> {
    ipcRenderer.send('load-searchproduct-buys-window');
});

ipcRenderer.on('added-to-buy', async () => {
    const id = await ipcRenderer.invoke('get-added-tobuy');
    const product = await ipcRenderer.invoke('search-product-byid', id);

    const sessionProduct = getItemSession(id);

    if(sessionProduct != null && sessionProduct != undefined){
        return
    } else {
        if(sessionProduct != null || sessionProduct != undefined){
            ipcRenderer.send('buys-product-alreadyadded');
        } else {
            if(product.id == null || product.id == undefined){
                ipcRenderer.send('product-not-found');
            } else {
                document.getElementById('id-product').value = product.id;
                document.getElementById('product-shower').value = product.description;
                
                ipcRenderer.send('added-productbuy');
            };
        };
    }
});

async function loadSuppliers(){
    const select = document.getElementById('supplier');

    const suppliers = await ipcRenderer.invoke('get-suppliers');

    const iterableObject = Object.entries(suppliers);

    iterableObject.map(supplier => {
        const option = document.createElement('option');
        option.setAttribute('value', supplier[1].id);
        option.innerText = `${supplier[1].name}`;

        select.insertAdjacentElement('beforeend', option);
    });
};

loadSuppliers();

function buyEnd(){
    const items = getAllItemSession();
    const supplierId = document.getElementById('supplier').value;
    const howPaid = document.getElementById('howPaid').value;
    if(items.length != 0 && supplier && howPaid != ''){
        ipcRenderer.send('buy-end', {items, supplierId, howPaid});
    } else {
        
    }
};

function clearList(){
    clearAllItemSession();

    const tbody = document.getElementById('tbody-buy');
    tbody.innerHTML = '';

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
}

ipcRenderer.on('buy-confirmation', () => {
    clearList();
});