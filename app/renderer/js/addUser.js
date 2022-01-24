const ipcRenderer = window.app;

async function addUser () {
    const idEmplooy = document.getElementById('emplooy').value;
    // m == menu
    const mStock = document.getElementById('stock');
    const mSells = document.getElementById('sells');
    const mBuys = document.getElementById('buys');
    const mStats = document.getElementById('stats');
    const mMaintenance = document.getElementById('maintenance');
    const mInvoicing = document.getElementById('invoicing');
    const mAdmin = document.getElementById('admin');
    
    let stock = 0, sells = 0, buys = 0, stats = 0, maintenance = 0, invoicing = 0, admin = 0;
    if(mStock.checked == true) {
        stock = 1;
    };

    if(mSells.checked == true) {
        sells = 1;
    };

    if(mBuys.checked == true) {
        buys = 1;
    };

    if(mStats.checked == true) {
        stats = 1;
    };

    if(mMaintenance.checked == true) {
        maintenance = 1;
    };

    if(mInvoicing.checked == true) {
        invoicing = 1;
    };

    if(mAdmin.checked == true) {
        admin = 1;
    };

    const permissions = {
        menuStock: stock,
        menuSells: sells,
        menuBuys: buys,
        menuQuery: stats,
        menuMaintenance: maintenance,
        menuInvoicing: invoicing,
        menuAdmin: admin,
    };

    const branches = [];

    const allBranches = await ipcRenderer.invoke('get-all-branches');

    const iterable = Object.values(allBranches);

    for (const branch of iterable) {
        const checkbox = document.getElementById(`branch${branch.id}`);

        if(checkbox.checked == true){
            branches.push(branch.id);
        };
    };

    ipcRenderer.send('add-user', {permissions, idEmplooy, branches});
};