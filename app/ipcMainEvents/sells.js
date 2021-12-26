const { ipcMain, dialog } = require('electron');

const storeProducts = require('../components/products/store');
const storeCustomers = require('../components/customers/store');
const storeOrders = require('../components/orders/store');
const storeSells = require('../components/sells/store');

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
        const sells = storeSells.getAllSells();
        createSellsHistoryWindow({sells});
    });

    ipcMain.handle('get-sell-detail', (e, id) => {
        const sellDetail = storeSells.getSellDetail(id);
        if(sellDetail){
            return sellDetail;
        };
    });

    ipcMain.handle('search-sells-by-date', (e, {fromDate, toDate}) => {
        const sellsByDate = storeSells.getSellsByDate(fromDate, toDate);
        return sellsByDate;
    });

    ipcMain.on('load-payment-window', (e, dataSell) => {
        const { totalAmount, articlesQuantity } = dataSell;
        createPaymentWindow({
            totalAmount,
            articlesQuantity, 
        });
        
    });

    ipcMain.on('load-search-products-window', () => {
        const products = storeProducts.getAllProducts();
        createSearchProductsWindow({products});
    });

    ipcMain.on('sell-cash-confirmation', (e, args) => {
        const paymentWindow = returnPaymentWindow();
        const { totalAmount, amountToBeReturned } = args;
        dialog.showMessageBoxSync(paymentWindow, {
            title: 'Venta Finalizada',
            message: `Cobrar: $ ${totalAmount}.
                     Vuelto: $ ${amountToBeReturned}`,
            type: 'info',
            buttons: ['Cerrar'],
        });
        paymentWindow.close();
        const mainWindow = returnMainWindow();

        mainWindow.webContents.send('clear-product-list');
    });

    ipcMain.on('sell-cash-incompleted', (e, {debt, totalAmount}) => {
        const customers = storeCustomers.getAllCustomers();
        createCustomerListWindow({ totalAmount: debt, totalAmountPlusDebt: totalAmount, customers, howPaid: 'Contado/Cuenta Corriente' });
        const customerList = returnCustomerListWindow(); 

        const response = dialog.showMessageBoxSync(customerList, {
            title: 'Confirmación',
            message: `El monto restante de la venta en efectivo ($ ${debt}) se agregará a la cuenta corriente del cliente que seleccione...`,
            type: 'info',
            buttons: ['Aceptar', 'Cancelar'],
        });

        if(response == 0){
            return
        } else {
            customerList.close();
        };
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

    ipcMain.on('load-customer-list', (e, {totalAmount, operation}) => {
        const customers = storeCustomers.getAllCustomers();
        createCustomerListWindow({
            totalAmount,
            customers,
            totalAmountPlusDebt: totalAmount,
            howPaid: 'Cuenta Corriente',
            operation,
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
                paymentWindow.close();
                storeCustomers.addToDebt(customer.id, args.totalAmount);
                mainWindow.webContents.send('get-sells-details');
                ipcMain.on('get-sells-details', (e, {sessionStorage, priceList}) => {
                    storeSells.addSell({
                        amount: args.totalAmountPlusDebt,
                        branch: 'Principal', //Modificar cuando se hagan las sesiones.
                        emplooy: 'Administador', //Modificar cuando se hagan las sesiones.
                        customer: customer.name,
                        howPaid: args.howPaid,
                        details: sessionStorage,
                        priceList,
                    });
                    mainWindow.webContents.send('clear-product-list');
                    
                });
                
            };
        }
        
    });

    ipcMain.on('load-orders-window', (e, args) => {
        const orders = storeOrders.getAllOrders();
        createOrdersWindow({orders});
    });

    ipcMain.handle('get-order', (e, id) => {
        const order = storeOrders.getOrder(id);
        if(order != undefined && order != null){
            return order;
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

    ipcMain.on('select-customer-for-order', (e, {id, totalAmount}) => {
        let customer;
        if(id != null && id != undefined){
           customer = storeCustomers.getCustomer(id);
        };

        const customerList = returnCustomerListWindow();
        const customerConfirmation = dialog.showMessageBoxSync(customerList, {
            title: `Cliente Seleccionado: ${customer.id} ${customer.name}`,
            message: 'Confirmar Cliente',
            type: 'info',
            buttons: ['Cancelar', 'Confirmar'],
        });

        if(customerConfirmation == 1){
            customerList.close();
            const paymentWindow = returnPaymentWindow();

            const sellConfirmation = dialog.showMessageBoxSync(paymentWindow, {
                title: `Cliente: ${customer.id} ${customer.name}`,
                message: `Monto: $ ${totalAmount}. 
                Agregar Pedido.`,
                type: 'info',
                buttons: ['Cancelar','Confirmar'],
            });
            if(sellConfirmation == 1){
                const mainWindow = returnMainWindow();
                //confirmar venta function, update deuda, update stock, update todo
                paymentWindow.close();
                mainWindow.webContents.send('get-sells-details');
                ipcMain.on('get-sells-details', (e, {sessionStorage, priceList}) => {
                    storeOrders.addOrder({
                        amount: totalAmount,
                        branch: 'Principal', //Modificar cuando se hagan las sesiones.
                        emplooy: 'Administrador', //Modificar cuando se hagan las sesiones.
                        customer: customer.id,
                        details: sessionStorage,
                        priceList,
                    });
                    mainWindow.webContents.send('clear-product-list');
                    
                });
                
            };
        }
        
    });

    ipcMain.handle('delete-sell', (e, id) => {
        if(id){
            const sellsWindow = returnSellsHistoryWindow();
            const sell = storeSells.getSell(id);
            const answer = dialog.showMessageBoxSync(sellsWindow, {
                title: `Eliminar venta N ${sell.id}`,
                message: `Realmente desea eliminar de forma permanente? Cliente: ${sell.customer}`,
                type: 'question',
                buttons: ['Cancelar', 'Confirmar'],
            });

            if(answer == 1){
                storeSells.deleteSell(id);
                return true;
            } else {
                return false;
            }
        }
    });

    ipcMain.handle('delete-order', (e, id) => {
        if(id){
            const ordersWindow = returnOrdersWindow();
            const order = storeOrders.getOrder(id);
            const answer = dialog.showMessageBoxSync(ordersWindow, {
                title: `Eliminar pedido N ${order.id}`,
                message: `Realmente desea eliminar de forma permanente? Cliente: ${order.customer}`,
                type: 'question',
                buttons: ['Cancelar', 'Confirmar'],
            });

            if(answer == 1){
                storeOrders.deleteOrder(id);
                return true;
            } else {
                return false;
            }
        }
    });
};