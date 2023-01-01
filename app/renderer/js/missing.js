const ipcRenderer = window.app;

let state = 0;
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const formId  = document.getElementById('search-id-form');
const formDescription  = document.getElementById('search-description-form');

prev.disabled = true;

function filterMissing (products){
    const missing = [];
    for (const product of products) {
        if(parseFloat(product.stock) < parseFloat(product.stockMin)){
            missing.push(product);
        };  
    };
    return missing;
};

function addList(list){
    const tbody = document.getElementById('tbody-missing')
    tbody.innerHTML = '';
    for (const product of list) {
        const tr = document.createElement('tr');
        tr.id = `tr${product.id}`;
        const thId = document.createElement('th');
        thId.innerText = product.id;
        const thDesc = document.createElement('th');
        thDesc.innerText = product.description;
        const thDep = document.createElement('th');
        thDep.innerText = product.department.description;
        const thStock = document.createElement('th');
        thStock.innerText = product.stock;
        const thSMin = document.createElement('th');
        thSMin.innerText = product.stockMin;
        const thUnit = document.createElement('th');
        thUnit.innerText = `${product.unitMeasure.longDescription}, (${product.unitMeasure.shortDescription})`

        tr.appendChild(thId);
        tr.appendChild(thDesc);
        tr.appendChild(thDep);
        tr.appendChild(thStock);
        tr.appendChild(thSMin);
        tr.appendChild(thUnit);

        tbody.appendChild(tr);
    };
};

async function bringNewList(state){
    const newList = await ipcRenderer.invoke('products-missing-change', state);
    console.log(newList);
    addList(newList);
    const label = document.getElementById('label-pag');
    label.innerText = `Página ${state + 1}`;
};

next.addEventListener('click', async () => {
    state++;
    await bringNewList(state);
    prev.disabled = false;
});

prev.addEventListener('click', async () => {
    if(state != 0){
        state--;
        prev.disabled = false;
        if(state == 0){
            prev.disabled = true;
        };
        await bringNewList(state);
    } else {
        prev.disabled = true;
    }
});

async function resetList() {
    await bringNewList(0);
    const label = document.getElementById('label-pag');
    label.innerText = `Página 1`;
    next.disabled = false;
    document.getElementById('description-product').value = '';
    document.getElementById('id-product').value = '';
};

function noMatchError() {
    let tbody = document.getElementById('tbody-missing');
    let tr = document.createElement('tr');
    tr.innerHTML = `<tr class="odd" id="tr-alert">
    <td valign="top" colspan="6" class="dataTables_empty">No existen coincidencias!</td>
  </tr>`;
    tbody.innerHTML = '';
    tbody.appendChild(tr);
};

async function searchProductById () {
    let id = document.getElementById('id-product').value;
    let products = await ipcRenderer.invoke('search-products-bypartid', id);
    const missing = filterMissing(products)
    let tbody = document.getElementById('tbody-missing');
    tbody.innerHTML = '';
    if(missing) {
        //add product to the html
        for (const product of missing) {
            addProductToTable(product);
        };
        id.value = '';
    } else {
        noMatchError();
    };
};

async function searchProductByDescription () {
    let description = document.getElementById('description-product').value;
    let products = await ipcRenderer.invoke('search-products-bydescription', description);
    const missing = filterMissing(products);
    let tbody = document.getElementById('tbody-missing');
    tbody.innerHTML = '';
    if(missing){
        for (const product of missing) {
            addProductToTable(product);  
        };
        const label = document.getElementById('label-pag');
        label.innerText = `Página de búsqueda`;
        prev.disabled = true;
        next.disabled = true;
    } else {
        noMatchError();
    };
};

function addProductToTable (product) {
    let tbody = document.getElementById('tbody-missing');
    const tr = document.createElement('tr');
        tr.id = `tr${product.id}`;
        const thId = document.createElement('th');
        thId.innerText = product.id;
        const thDesc = document.createElement('th');
        thDesc.innerText = product.description;
        const thDep = document.createElement('th');
        thDep.innerText = product.department.description;
        const thStock = document.createElement('th');
        thStock.innerText = product.stock;
        const thSMin = document.createElement('th');
        thSMin.innerText = product.stockMin;
        const thUnit = document.createElement('th');
        thUnit.innerText = `${product.unitMeasure.longDescription}, (${product.unitMeasure.shortDescription})`

        tr.appendChild(thId);
        tr.appendChild(thDesc);
        tr.appendChild(thDep);
        tr.appendChild(thStock);
        tr.appendChild(thSMin);
        tr.appendChild(thUnit);

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