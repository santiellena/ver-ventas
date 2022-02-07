async function loadAuth () {
    const logininfo = await ipcRenderer.invoke('get-login-info');
    const sellsMenu = document.getElementById('sells-menu');
    const buysMenu = document.getElementById('buys-menu');
    const stockMenu = document.getElementById('stock-menu');
    const customersMenu = document.getElementById('customers-menu');
    const cashRegisterMenu = document.getElementById('cashRegister-menu');
    const statsMenu = document.getElementById('stats-menu');
    const maintenanceMenu = document.getElementById('maintenance-menu');
    const securityMenu = document.getElementById('security-menu');

    const footerName = document.getElementById('whois');
    const welcomeName = document.getElementById('welcome-name');
    if(logininfo){
        footerName.innerText = logininfo.name;
        welcomeName.innerText = logininfo.name;
        
        if(logininfo.menuStock == 0){
            stockMenu.remove();
        };
        if(logininfo.menuBuys == 0){
            buysMenu.remove();
        };
        if(logininfo.menuSells == 0){
            sellsMenu.remove();
            customersMenu.remove();
        };
        if(logininfo.menuMaintenance == 0){
            maintenanceMenu.remove();
            cashRegisterMenu.remove();
        };
        if(logininfo.menuQuery == 0){
            statsMenu.remove();
        };
        if(logininfo.menuAdmin == 0){
            securityMenu.remove();
        };

    };
};

loadAuth();