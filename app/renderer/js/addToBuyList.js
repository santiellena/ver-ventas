const ipcRenderer = window.app;

function addToBuyList(id){
    if(id != null && id != undefined){
        ipcRenderer.send('load-id-to-buy', id);
    };
};