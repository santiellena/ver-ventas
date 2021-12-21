const ipcRenderer = window.app;
async function seeBuyDetail (id){
    //Must return an object with the sell detail
    const details = await ipcRenderer.invoke('get-buys-detail', id);

    const tbodyDetails = document.getElementById('tbody-details');

    const arrDetails = Object.entries(details);
    console.log(arrDetails);
    let allItems = '';
    arrDetails.map(detail => {
        allItems = allItems + `<tr><th>${detail[1].quantity}</th><th>${detail[1].product}</th><th>$ ${detail[1].price}</th></tr>`
    });

    tbodyDetails.innerHTML = allItems;
}