const { ipcMain, dialog } = require('electron');

const storeArticles = require('./components/articles/store');

const { mainHandlebars,
        historyHandlebars,
        returnMainWindow,
        returnLoginWindow,
        returnSettingsWindow,
        returnSellsHistoryWindow,
        returnPaymentWindow,
        
} = require('./createWindows');

module.exports = ({
    createMainWindow,
    createLoginWindow,
    createSettingsWindow,
    createSellsHistoryWindow,
    createPaymentWindow,
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

    ipcMain.on('load-payment-window', (e, dataSell) => {
        const { totalAmount, articlesQuantity } = dataSell;
        createPaymentWindow({
            totalAmount,
            articlesQuantity
        });
    });

    ipcMain.on('sell-cash-confirmation', (e, args) => {
        const paymentWindow = returnPaymentWindow();
        dialog.showMessageBoxSync(paymentWindow, {
            title: 'Venta',
            message: 'Venta finalizada',
            type: 'info',
            buttons: ['Cerrar'],
        });
        paymentWindow.close();
    });

    ipcMain.on('sell-card-confirmation', (e, args) => {
        const paymentWindow = returnPaymentWindow();
         const response  = dialog.showMessageBoxSync(paymentWindow, {
            title: 'Venta por tarjeta',
            message: 'Venta finalizada',
            type: 'question',
            message: `Ingrese la tarjeta y cobre ${args}, si la tarjeta fue aceptada presione "Confirmar."`,
            buttons: ['Confirmar', 'Cancelar'],
        });

        if(response == 0){

            paymentWindow.close();
            //Update db para agregar venta
        } else if(response == 1){
            return
        }
    });

    


}   