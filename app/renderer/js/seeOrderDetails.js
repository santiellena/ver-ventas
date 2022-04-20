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
        
        if(order.priceList == 'public'){
            const amount = detail.unitPrice * detail.OrderProduct.quantity;

            text = text + `<tr><th>${detail.OrderProduct.quantity}</th><th>${detail.description}</th><th>$ ${detail.unitPrice}</th><th>$ ${amount}</th></tr>`;

            counter++;
            if(details.length == counter){
                textHtml = text;
            }
        } else {
            const amount = detail.wholesalerPrice * detail.OrderProduct.quantity;

            text = text + `<tr><th>${detail.OrderProduct.quantity}</th><th>${detail.description}</th><th>$ ${detail.wholesalerPrice}</th><th>$ ${amount}</th></tr>`;

            counter++;
            if(details.length == counter){
                textHtml = text;
            }
        }
    };

    tbody.innerHTML = textHtml;
};

async function deleteOrder(id){
    if(id){
        const answer = await ipcRenderer.invoke('delete-order', id);

        if(answer == true){
            const tr = document.getElementById(`tr${id}`);
            tr.remove();
            const childElements = document.getElementsByClassName('child');
            for (const element of childElements) {
                element.remove();
            };
        };
    };
};

let idPivot = 0;
async function addSell (idOrder) {
    if(idOrder){
        ipcRenderer.send('add-sell-from-order', idOrder);
        idPivot = idOrder;
    };
};

ipcRenderer.on('confirm-order-sell', () => {
    ipcRenderer.send('delete-order', idPivot);
    const tr = document.getElementById(`tr${idPivot}`);
            tr.remove();
            const childElements = document.getElementsByClassName('child');
            for (const element of childElements) {
                element.remove();
            };
    idPivot = 0;
});