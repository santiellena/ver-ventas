const { ipcMain, dialog } = require('electron');

const storeProducts = require('../components/products/store');
const storeCustomers = require('../components/customers/store');
const storeOrders = require('../components/orders/store');

const { mainHandlebars,
        historyHandlebars,
        returnSellsHistoryWindow,
        returnPaymentWindow,
        returnMainWindow,
        returnSearchProductsWindow,
        returnCustomerListWindow,
        returnOrdersWindow,
        
} = require('../createWindows');

module.exports = ({
    createSellsHistoryWindow,
    createPaymentWindow,
    createSearchProductsWindow,
    createCustomerListWindow,
    createOrdersWindow,
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

    ipcMain.handle('search-product-byid', (e, id) => {
        const product = storeProducts.getProduct(id);
        if(product == null){
            return 'Producto no encontrado. F10-Buscar'
        }
        return product;
    });

    ipcMain.handle('get-tax-percentage', (e, args) => {
        return 21;
    });

    let idSellList;
    ipcMain.on('add-product-tosell-list', (e, id) => {
        const mainWindow = returnMainWindow();
        if(id != undefined && id != null){
            mainWindow.webContents.send('add-product-tosell-list');     
        }
        idSellList = id;
    });

    ipcMain.handle('get-id-forsell-list', () => {
        const id = idSellList;
        delete idSellList;
        return id;
    });

    ipcMain.on('load-customer-list', (e, totalAmount) => {
        createCustomerListWindow({
            totalAmount,
        });
    });

    ipcMain.on('select-customer-whopays', (e, args) => {
        let customer;
        if(args.id != null && args.id != undefined){
           customer = storeCustomers.getCustomer(args.id);
        };

        const customerList = returnCustomerListWindow();
        const customerConfirmation = dialog.showMessageBoxSync(customerList, {
            title: `Cliente Seleccionado: ${customer.id} ${customer.name}`,
            message: 'Confirmar cuenta corriente',
            type: 'info',
            buttons: ['Cancelar', 'Confirmar'],
        });

        if(customerConfirmation == 1){
            customerList.close();
            const paymentWindow = returnPaymentWindow();

            const sellConfirmation = dialog.showMessageBoxSync(paymentWindow, {
                title: `Cliente: ${customer.id} ${customer.name}`,
                message: `Monto: $ ${args.totalAmount}. 
                Agregar a cuenta corriente.`,
                type: 'info',
                buttons: ['Cancelar','Confirmar'],
            });

            if(sellConfirmation == 1){
                const mainWindow = returnMainWindow();
                //confirmar venta function, update deuda, update stock, update todo
                mainWindow.webContents.send('clear-product-list');
                paymentWindow.close();
            }
        }

    });

    ipcMain.on('load-orders-window', (e, args) => {
        const orders = storeOrders.getAllOrders();
        createOrdersWindow({orders});
    });

    ipcMain.handle('get-order-details', (e, id) => {
        const details = storeOrders.getOrderDetails(id);
        if(details != undefined && details != null){
            return details;
        }
        else {
            return null;
        }
    });

    ipcMain.handle('get-orders-bydate', (e, { from, to }) => {
        if(from != undefined && from != null && to != undefined && to != null){
            const orders = storeOrders.getOrdersByDate(from, to);

            return orders;
        } else {
            throw new Error('Dates data is invalid');
        }
    });
    
    ipcMain.handle('get-orders', () => {

        return storeOrders.getAllOrders();
    });
}