async function renderList() {
  const items = getAllItemSession(key);
  const tbody = document.getElementById("tbody-list");

  if (items.length != 0) {
    tbody.innerHTML = "";
    for (const e of items) {
      const quantity = e[1];
      const id = e[0];

      const product = await ipcRenderer.invoke("search-product-byid", id);
      const { stock, unitPrice, description } = product;
      let discount = 0;
      if (product.onSale == 1) {
        if (checkPriceList() == "public") {
          discount = await ipcRenderer.invoke("get-product-discount", id);
        }
      }
      const tr = document.createElement("tr");
      tr.setAttribute("id", `tr${id}`);
      const tdInputQuantity = document.createElement("td");
      const inputQuantity = document.createElement("input");
      inputQuantity.setAttribute("type", "number");
      inputQuantity.setAttribute("id", `quantArticle${id}`);
      inputQuantity.setAttribute("class", "form-control input-list");
      inputQuantity.setAttribute("name", `quantArticle${id}`);
      inputQuantity.setAttribute("value", quantity);
      inputQuantity.setAttribute("required", "true");
      inputQuantity.setAttribute(
        "onkeydown",
        `updateAmountByInput(${id}); updateSubTotal();`
      );
      inputQuantity.setAttribute(
        "onchange",
        `updateAmountByInput(${id}); updateSubTotal();`
      );
      tdInputQuantity.appendChild(inputQuantity);
      const tdDescription = document.createElement("td");
      const tdId = document.createElement("td");
      const tdStock = document.createElement("td");
      const tdUnitPrice = document.createElement("td");
      tdUnitPrice.setAttribute("id", `unitPrice${id}`);
      const tdDiscount = document.createElement("td");
      tdDiscount.setAttribute("id", `discount${id}`);
      const tdSubTotal = document.createElement("td");
      tdSubTotal.setAttribute("id", `sub-total${id}`);
      const tdButton = document.createElement("td");
      const buttonDelete = document.createElement("button");
      buttonDelete.setAttribute("class", "btn btn-danger");
      buttonDelete.setAttribute("onclick", `deleteProductList(${id});`);
      buttonDelete.innerText = "X";
      tdButton.appendChild(buttonDelete);

      tdDescription.innerText = description;
      tdId.innerText = id;
      tdStock.innerText = stock;
      tdUnitPrice.innerText = `$ ${unitPrice}`;
      tdDiscount.innerText = `$ ${discount * quantity}`;
      const subTotal = unitPrice * quantity - discount * quantity;
      tdSubTotal.innerText = `$ ${subTotal}`;

      tr.appendChild(tdInputQuantity);
      tr.appendChild(tdDescription);
      tr.appendChild(tdId);
      tr.appendChild(tdStock);
      tr.appendChild(tdUnitPrice);
      tr.appendChild(tdDiscount);
      tr.appendChild(tdSubTotal);
      tr.appendChild(tdButton);

      tbody.appendChild(tr);
      if (items[items.length - 1] == e) {
        updateSubTotal();
      }
    }
  } else {
    updateSubTotal();
  }
}

renderList();

function clearVisibleList() {
  const tbody = document.getElementById("tbody-list");
  tbody.innerHTML = "";
  const items = getAllItemSession(key);
  if (items.length > 0) {
    renderList();
  } else {
    const trAlert = document.createElement("tr");
    trAlert.setAttribute("class", "odd");
    trAlert.setAttribute("id", "tr-alert");
    const tdAlert = document.createElement("td");
    tdAlert.setAttribute("valign", "top");
    tdAlert.setAttribute("colspan", "8");
    tdAlert.setAttribute("class", "dataTables_empty");
    tdAlert.innerText = "Ningún Producto Agregado";
    trAlert.appendChild(tdAlert);

    tbody.appendChild(trAlert);
    updateSubTotal();
  }
}

function changeList(newKey) {
  key = newKey;
  clearVisibleList();
}
