const ipcRenderer = window.app;
async function seeDetail (id){
    //Must return an object with the sell detail
    const details = await ipcRenderer.invoke('get-sell-detail', id);

    const tbodyDetails = document.getElementById('tbody-details');

    let allItems = '';
    details.map(detail => {
        allItems = allItems + `<tr><th>${detail.SellProduct.quantity}</th><th>${detail.description}</th><th>$ ${detail.SellProduct.price}</th></tr>`
    });

    tbodyDetails.innerHTML = allItems;
}

async function deleteSell (id) {
    if(id){
        const answer = await ipcRenderer.invoke('delete-sell', id);

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