const { ipcMain } = require('electron');
const { mainHandlebars, historyHandlebars } = require('./createWindows');

module.exports = ({
    createMainWindow,
    createLoginWindow,
    createSettingsWindow,
    createSellsHistoryWindow,
    createPaymentWindow,
    returnMainWindow,
    returnLoginWindow,
    returnSettingsWindow,
    returnSellsHistoryWindow,
    returnPaymentMethod,
}) => {
    ipcMain.handle('login', (e, args) => {
        const { username, password } = args;
        if(username == 'admin' &&  password == 'admin'){ 
        
          
          createMainWindow();
          return true;
        } else {
          
          return false;
        }
      });

    ipcMain.on('load-page-main', (e, pageName) => {
        const mainWindow = returnMainWindow()
        if( mainWindow != null && mainWindow != undefined ) {
            mainWindow.loadFile(mainHandlebars.render(pageName));
        } else {
            console.log('Is still undefinded');
        }
        
    });

    ipcMain.on('logout', (e, args) => {
        createLoginWindow();
    });

    ipcMain.on('fullscreen-mainwindow', (e, args) => {

    });

    ipcMain.on('load-settings', (e, args) => {
       createSettingsWindow();
    });
    
    ipcMain.on('open-sells-history', () => {
        createSellsHistoryWindow();
    });

    ipcMain.handle('get-sell-detail', (e, args) => {
        const details = {
            detail1: [
                4, 
                'Mayonesa',
                '$1200'
            ],

            detail2: [
                4, 
                'Ketchup',
                '$1000'
            ],
        };

        return details;
    });

    ipcMain.handle('search-sells-by-date', (e, args) => {
        const sells = {
            sell1: [
                2, 
                args.fromDate,
                '$2000',
                'Consumidor final',
                'Principal',
                'Cuenta corriente'
            ],
        };

        return sells;
    });

    ipcMain.on('load-payment-window', (e, args) => {
        createPaymentWindow();
    });

}   