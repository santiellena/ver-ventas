async function renderList(){
const items = getAllItemSession();
const tbody = document.getElementById('tbody-list');

if(items.length != 0){
    tbody.innerHTML = '';
    items.map(async e => {
        const quantity = e[1];
        const id = e[0];

        const product = await ipcRenderer.invoke('search-product-byid', id);
        const { stock, unitPrice, description } = product;
        const tr = document.createElement('tr');
        tr.setAttribute('id', `tr${id}`);
        const tdInputQuantity = document.createElement('td');
        const inputQuantity = document.createElement('input');
        inputQuantity.setAttribute('type', 'number');
        inputQuantity.setAttribute('id', `quantArticle${id}`);
        inputQuantity.setAttribute('class', 'form-control input-list');
        inputQuantity.setAttribute('name', `quantArticle${id}`);
        inputQuantity.setAttribute('value', quantity);
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
        const subTotal = unitPrice * quantity;
        tdSubTotal.innerText = `$ ${subTotal}`;
    
        tr.appendChild(tdInputQuantity);
        tr.appendChild(tdDescription);
        tr.appendChild(tdId);
        tr.appendChild(tdStock);
        tr.appendChild(tdUnitPrice);
        tr.appendChild(tdSubTotal);
        tr.appendChild(tdButton);
    
        tbody.appendChild(tr);
    });
}

    updateSubTotal();
}

renderList();