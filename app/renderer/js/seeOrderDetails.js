async function seeOrderDetails (id) {
    const tbody = document.getElementById('tbody-details');

    const order = await ipcRenderer.invoke('get-order', id);
    const details = order.details;
    let counter = 0;
    let text = '';
    let textHtml = '';
    for (const detail of details) {
        if(detail == null){
            alert('ERROR');
            return
        };
        
        const product = await ipcRenderer.invoke('search-product-byid', detail.idProduct);
        if(order.priceList == 'public'){
            const amount = product.unitPrice * detail.quantity;

            text = text + `<tr><th>${detail.quantity}</th><th>${product.description}</th><th>$ ${product.unitPrice}</th><th>$ ${amount}</th></tr>`;

            counter++;
            if(details.length == counter){
                textHtml = text;
            }
        } else {
            const amount = product.wholesalerPrice * detail.quantity;

            text = text + `<tr><th>${detail.quantity}</th><th>${product.description}</th><th>$ ${product.wholesalerPrice}</th><th>$ ${amount}</th></tr>`;

            counter++;
            if(details.length == counter){
                textHtml = text;
            }
        }
    };

    tbody.innerHTML = textHtml;
};