const { ipcMain, dialog } = require('electron');

const storeProducts = require('../components/products/store');

const { mainHandlebars,
        historyHandlebars,
        returnSellsHistoryWindow,
        returnPaymentWindow,
        returnMainWindow,
        returnSearchProductsWindow,
        
} = require('../createWindows');

module.exports = ({
    createSellsHistoryWindow,
    createPaymentWindow,
    createSearchProductsWindow,
}) => {
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

    ipcMain.on('load-search-products-window', () => {
        createSearchProductsWindow();
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
        const mainWindow = returnMainWindow();

        mainWindow.webContents.send('clear-product-list');
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

    ipcMain.handle('get-product-list', (e, args) => {

    });

    ipcMain.handle('search-product-byid', (e, id) => {
        const product = storeProducts.getProduct(id);
        if(product == null){
            return 'Producto no encontrado. F10-Buscar'
        }
        return product;
    });

    ipcMain.handle('get-tax-percentage', (e, args) => {
        return 0;
    });

}