const ipcRenderer = window.app;

async function onLoad () {
    //const idEmplooy = document.getElementById('emplooy').value;
    const idUser = document.getElementById('userId').value;
    const branchesAllowed = await ipcRenderer.invoke('get-branches-selected-byuser', idUser);
    const permissions = await ipcRenderer.invoke('get-user-permissions', idUser);
    // m == menu
    const mStock = document.getElementById('stock');
    const mSells = document.getElementById('sells');
    const mBuys = document.getElementById('buys');
    const mStats = document.getElementById('stats');
    const mMaintenance = document.getElementById('maintenance');
    const mInvoicing = document.getElementById('invoicing');
    const mAdmin = document.getElementById('admin');

    if(permissions.menuStock == 1){
        mStock.checked = true;
    };

    if(permissions.menuSells == 1){
        mSells.checked = true;
    };

    if(permissions.menuBuys == 1){
        mBuys.checked = true;
    };

    if(permissions.menuQuery == 1){
        mStats.checked = true;
    };

    if(permissions.menuMaintenance == 1){
        mMaintenance.checked = true;
    };

    if(permissions.menuInvoicing == 1){
        mInvoicing.checked = true;
    };

    if(permissions.menuAdmin == 1){
        mAdmin.checked = true;
    };

    for (const branch of branchesAllowed) { 
        const check = document.getElementById(branch.name);
        check.checked = true;
    };
};

onLoad();

function editUser () {

};

function deleteUser () {
    const idUser = document.getElementById('userId').value;
    ipcRenderer.send('delete-user', idUser);
};