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
    const mQueries = document.getElementById('queries');
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

    if(permissions.menuQueries == 1){
        mQueries.checked = true;
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

async function editUser () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const mStock = document.getElementById('stock');
    const mSells = document.getElementById('sells');
    const mBuys = document.getElementById('buys');
    const mQueries = document.getElementById('queries');
    const mMaintenance = document.getElementById('maintenance');
    const mInvoicing = document.getElementById('invoicing');
    const mAdmin = document.getElementById('admin');

    let menuStock = 0;
    let menuSells = 0;
    let menuBuys = 0;
    let menuQueries = 0;
    let menuMaintenance = 0;
    let menuInvoicing = 0;
    let menuAdmin = 0;

    if(mStock.checked == true){
        menuStock = 1;
    };

    if(mSells.checked == true){
        menuSells = 1;
    };

    if(mBuys.checked == true){
        menuBuys = 1;
    };

    if(mQueries.checked == true){
        menuQueries = 1;
    };

    if(mMaintenance.checked == true){
        menuMaintenance = 1;
    };

    if(mInvoicing.checked == true){
        menuInvoicing = 1;
    };

    if(mAdmin.checked == true){
        menuAdmin = 1;
    };

    const allBranches = await ipcRenderer.invoke('get-all-branches');
    const branches = [];

    for (const branch of Object.values(allBranches)) {
        const check = document.getElementById(branch.name);
        if (check.checked == true){
            branches.push(branch.id);
        };
    };

    const idUser = document.getElementById('userId').value;

    const response = await ipcRenderer.invoke('edit-user', {
        id: idUser,
        username,
        branches,
        password,
        menuStock,
        menuAdmin,
        menuBuys,
        menuMaintenance,
        menuSells,
        menuInvoicing,
        menuQueries,
    });

    const alertDiv = document.getElementById('alert');
    if(response){
        alertDiv.innerHTML = '<div class="alert alert-success alert-dismissible " role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="clearAlert();"><span aria-hidden="true">×</span></button><strong>Éxito!</strong> Modificado Correctamente</div>'
    } else {
        alertDiv.innerHTML = '<div class="alert alert-danger alert-dismissible " role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="clearAlert();"><span aria-hidden="true">×</span></button><strong>Error!</strong></div>'
    };
};

function deleteUser () {
    const idUser = document.getElementById('userId').value;
    ipcRenderer.send('delete-user', idUser);
};

function clearAlert () {
    const alertDiv = document.getElementById('alert');
    alertDiv.innerHTML = '';
};