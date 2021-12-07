ipcRenderer = window.app;

function addToSellList(id) {
    if(id != null && id != undefined){
        ipcRenderer.send('add-product-tosell-list', id);
    };
};