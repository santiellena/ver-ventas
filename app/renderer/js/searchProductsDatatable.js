const formId  = document.getElementById('search-id-form');
const formDescription  = document.getElementById('search-description-form');

function noMatchError() {
    let tbody = document.getElementById('tbody-sells');
    let tr = document.createElement('tr');
    tr.innerHTML = `<tr class="odd" id="tr-alert">
    <td valign="top" colspan="6" class="dataTables_empty">No existen coincidencias!</td>
  </tr>`;
    tbody.innerHTML = '';
    tbody.appendChild(tr);
};

async function searchProductById () {
    let id = document.getElementById('id-product').value;
    let product = await ipcRenderer.invoke('search-product-byid', id);
    let tbody = document.getElementById('tbody-sells');
    tbody.innerHTML = '';
    if(product != 'Producto no encontrado. F10-Buscar') {
        //add product to the html
        addProductToTable(product);
        id.value = '';
    } else {
        noMatchError();
    };
};

async function searchProductByDescription () {
    let description = document.getElementById('description-product').value;
    let products = await ipcRenderer.invoke('search-products-bydescription', description);
    let tbody = document.getElementById('tbody-sells');
    tbody.innerHTML = '';
    if(products){
        for (const product of products) {
            addProductToTable(product);  
        };
    } else {
        noMatchError();
    };
};

function addProductToTable (product) {
    let tbody = document.getElementById('tbody-sells');
    let tr = document.createElement('tr');
    let thId = document.createElement('th');
    let thDesc = document.createElement('th');
    let thStock = document.createElement('th');
    let thUnitPrice = document.createElement('th');
    let thWholesalerPrice = document.createElement('th');
    let thButton = document.createElement('th');

    thId.innerText = product.id;
    thDesc.innerText = product.description;
    thStock.innerText = product.stock;
    thUnitPrice.innerText = product.unitPrice;
    thWholesalerPrice.innerText = product.wholesalerPrice;
    thButton.innerHTML = `<button class="btn btn-success" onclick="addToSellList(${product.id});">+</button>`

    thId.setAttribute('style', 'font-weight: normal;');
    thDesc.setAttribute('style', 'font-weight: normal;');
    thStock.setAttribute('style', 'font-weight: normal;');
    thUnitPrice.setAttribute('style', 'font-weight: normal;');
    thWholesalerPrice.setAttribute('style', 'font-weight: normal;');
    thButton.setAttribute('style', 'font-weight: normal;');

    tr.appendChild(thId);
    tr.appendChild(thDesc);
    tr.appendChild(thStock);
    tr.appendChild(thUnitPrice);
    tr.appendChild(thWholesalerPrice);
    tr.appendChild(thButton);
    tbody.appendChild(tr);
};

formId.addEventListener('submit', e => {
    e.preventDefault();
    searchProductById();
});

formDescription.addEventListener('submit', e => {
    e.preventDefault();
    searchProductByDescription();
});
