const ipcRenderer = window.app;
async function seeDetail (id){
    //Must return an object with the sell detail
    const details = await ipcRenderer.invoke('get-sell-detail', id);

    const tbodyDetails = document.getElementById('tbody-details');

    tbodyDetails.innerHTML = `<tr><th>4</th><th>Dulcrem</th></tr>`;
}