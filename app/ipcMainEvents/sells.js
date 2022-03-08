const { ipcMain, dialog } = require('electron');

const storeProducts = require('../components/products/store');
const storeCustomers = require('../components/customers/store');
const storeOrders = require('../components/orders/store');
const storeSells = require('../components/sells/store');
const storeMaintenance = require('../components/maintenance/store');
const storeCashRegister = require('../components/cashRegister/store');
const storeSales = require('../components/sales/store');
const configs = require('../config/config');

const { mainHandlebars,
        historyHandlebars,
        returnSellsHistoryWindow,
        returnPaymentWindow,
        returnMainWindow,
        returnSearchProductsWindow,
        returnCustomerListWindow,
        returnOrdersWindow,
        returnSalesWindow,
        returnAddSaleWindow,
        returnPayDebtsWindow,
        returnPayOrdersWindow,
} = require('../createWindows');

module.exports = ({
    createSellsHistoryWindow,
    createPaymentWindow,
    createSearchProductsWindow,
    createCustomerListWindow,
    createOrdersWindow,
    createSalesWindow,
    createAddSaleWindow,
    createPayOrderWindow,
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

    ipcMain.on('load-search-products-window', async () => {
        const products = await storeProducts.getAllProducts();
        createSearchProductsWindow({products});
    });

    let amountCashPivot = 0;
    ipcMain.on('sell-cash-confirmation', (e, args) => {
        const paymentWindow = returnPaymentWindow();
        const { totalAmount, amountToBeReturned, howMuchCash, invoicing } = args;
        if(invoicing == 1){
            const response = dialog.showMessageBoxSync(paymentWindow, {
                title: 'Facturar Venta?',
                message: 'Si confirma, se abrirá el menu de facturación.',
                buttons: ['Confirmar', 'Cancelar'],
            });
            if(response == 0){
                //facturar
            };
        } else {
            dialog.showMessageBoxSync(paymentWindow, {
                title: 'Venta Finalizada',
                message: `Cobrar: $ ${totalAmount}. 
                Paga con: $ ${howMuchCash}.
                Vuelto: $ ${amountToBeReturned.toFixed(2)}.`,
                type: 'info',
                buttons: ['Cerrar'],
            });
    
            const branchConfig = configs.getBranchDataFromConfig();
            const boxConfig = configs.getCashRegisterId();
    
            storeCashRegister.addToBox(boxConfig, branchConfig.id, totalAmount);
            paymentWindow.close();
            const mainWindow = returnMainWindow();
            amountCashPivot = totalAmount;
            mainWindow.webContents.send('get-sells-details');
            
        };
    });

    ipcMain.on('get-sells-details', (e, {sessionStorage, priceList}) => {
        const totalAmount = amountCashPivot;
        delete amountCashPivot;
        const branchConfig = configs.getBranchDataFromConfig();
        const emplooy = {id: 1, name: 'Administrador'};
        const sell = storeSells.addSell({
            amount: totalAmount,
            branch: branchConfig.id,
            emplooy, //Modificar cuando se hagan las sesiones.
            customer: {name: 'Consumidor Final', id: 99},
            howPaid: 'Efectivo',
            howMuchPaid: totalAmount,
            details: sessionStorage,
            priceList,
        });
        const mainWindow = returnMainWindow();
        mainWindow.webContents.send('clear-product-list');
    });

    ipcMain.on('sell-cash-incompleted', (e, {debt, totalAmount, invoicing}) => {
        const paymentWindow = returnPaymentWindow();
        if(invoicing == 1){
            const response = dialog.showMessageBoxSync(paymentWindow, {
                title: 'Facturar Venta?',
                message: 'Si confirma, se abrirá el menu de facturación.',
                buttons: ['Confirmar', 'Cancelar'],
            });
            if(response == 0 ){
                //facturar
            } else {
                return
            };
        } else {
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
        }
    });

    let amountPivotCard = 0;
    ipcMain.on('sell-card-confirmation', (e, args) => {
        const paymentWindow = returnPaymentWindow();
         const response  = dialog.showMessageBoxSync(paymentWindow, {
            title: 'Venta por Tarjeta',
            message: 'Confirmación de Venta',
            type: 'question',
            message: `Ingrese la tarjeta y cobre $ ${args}, si la tarjeta fue aceptada presione "Confirmar."`,
            buttons: ['Confirmar', 'Cancelar'],
        });

        if(response == 0){
            const mainWindow = returnMainWindow();
                //confirmar venta function, update deuda, update stock, update todo
                paymentWindow.close();
                mainWindow.webContents.send('get-sells-details-card');
                amountPivotCard = args;
        } else if(response == 1){
            return
        };
    });

    ipcMain.on('get-sells-details-card', (e, {sessionStorage, priceList}) => {
        const totalAmount = amountPivotCard;
        delete amountPivotCard;
        const emplooy = {id: 1, name: 'Administrador'};
        const branch = configs.getBranchDataFromConfig();
        storeSells.addSell({
            amount: totalAmount,
            branch: branch.id,
            emplooy, //Modificar cuando se hagan las sesiones.
            customer: {name: 'Consumidor Final', id: 99},
            howPaid: 'Tarjeta',
            howMuchPaid: totalAmount,
            details: sessionStorage,
            priceList,
        });
        const mainWindow = returnMainWindow();
        mainWindow.webContents.send('clear-product-list');
    });

    ipcMain.handle('search-product-byid', async (e, id) => {
        const product = await storeProducts.getProduct(id);
        if(product == null){
            return 'Producto no encontrado. F10-Buscar'
        }
        return product;
    });

    ipcMain.handle('get-tax-percentage', async  (e, args) => {
        return await storeMaintenance.getTaxPercentage(configs.returnToken());
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

    ipcMain.on('load-customer-list', (e, {totalAmount, operation, invoicing}) => {
        const customers = storeCustomers.getAllCustomers();
        if(invoicing == 1){
            const response = dialog.showMessageBoxSync(paymentWindow, {
                title: 'Facturar Venta?',
                message: 'Si confirma, se abrirá el menu de facturación.',
                buttons: ['Confirmar', 'Cancelar'],
            });
            if(response == 0 ){
                //facturar
            } else {
                return
            };
        } else {
            
            createCustomerListWindow({
                totalAmount,
                customers,
                totalAmountPlusDebt: totalAmount,
                howPaid: 'Cuenta Corriente',
                operation,        
            });
        };
    });

    let customerCreditPivot, amountCreditPivot;
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
                mainWindow.webContents.send('get-sells-details-credit');
                amountCreditPivot = args.totalAmountPlusDebt;
                customerCreditPivot = customer;
            };
        }
        
    });

    ipcMain.on('get-sells-details-credit', (e, {sessionStorage, priceList}) => {
        const totalAmount = amountCreditPivot;
        const customer = customerCreditPivot;
        delete amountCreditPivot;
        delete customerCreditPivot;
        const branch = configs.getBranchDataFromConfig();
        const emplooy = {id: 1, name: 'Administrador'};
        storeSells.addSell({
            amount: totalAmount,
            branch: branch.id, //Modificar cuando se hagan las sesiones.
            emplooy, //Modificar cuando se hagan las sesiones.
            customer: {name: customer.name, id: customer.id},
            howPaid: 'Cuenta Corriente',
            howMuchPaid: 0,
            details: sessionStorage,
            priceList,
        });
        const mainWindow = returnMainWindow();
        mainWindow.webContents.send('clear-product-list');
        
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

    let customerOrderPivot, amountOrderPivot = 0;
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
                customerOrderPivot = customer;
                amountOrderPivot = totalAmount;
                mainWindow.webContents.send('get-sells-details-order');
            };
        }
        
    });

    ipcMain.on('get-sells-details-order', (e, {sessionStorage, priceList}) => {
        const branch = configs.getBranchDataFromConfig();
        const totalAmount = amountOrderPivot;
        delete amountOrderPivot;
        const customer = customerOrderPivot;
        delete customerOrderPivot;
        storeOrders.addOrder({
            amount: totalAmount,
            branch: branch.id, //Modificar cuando se hagan las sesiones.
            emplooy: {id: 1, name: 'Administrador'}, //Modificar cuando se hagan las sesiones.
            customer: {id: customer.id, name: customer.name},
            details: sessionStorage,
            priceList,
        });
        const mainWindow = returnMainWindow();
        mainWindow.webContents.send('clear-product-list');
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
                message: `Realmente desea eliminar de forma permanente? Cliente: ${order.customer.name}`,
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

    ipcMain.on('delete-order', (e, id) => {
        if(id){
            const ordersWindow = returnOrdersWindow();
            const order = storeOrders.getOrder(id);
            const answer = dialog.showMessageBoxSync(ordersWindow, {
                title: `Pedido N ${order.id}`,
                message: `Pedido concretado como venta. Cliente: ${order.customer.name}`,
                type: 'info',
                buttons: ['Cerrar'],
            });
            storeOrders.deleteOrder(id);
        }
    });

    ipcMain.handle('get-product-discount', (e, idProduct) => {
        if(idProduct){
            const discount = storeSales.getSaleByProduct(idProduct).discount;
            if(discount) return discount
            else return 0;
        };
    });

    ipcMain.on('load-sales-page', () => {
        const sales = storeSales.getAllSalesWithProducts();
        createSalesWindow({sales});
    });

    ipcMain.on('load-addsale-page', () => {
        createAddSaleWindow();
    });

    let newSalePivot
    ipcMain.handle('add-sale', async (e, {
        idProduct,
        discount,
        fromDate,
        toDate,
    }) => {
        const newSale = storeSales.addSale({
            idProduct,
            discount,
            fromDate,
            toDate,
        });

        if(newSale){
            const salesWindow = returnSalesWindow();
            salesWindow.webContents.send('load-new-sale');
            newSalePivot = newSale;

            if(newSale.productChange == 1){
                await storeProducts.changeSaleStatus(newSale.idProduct);
            };

            return 1;
        } else {
            return null;
        };
    });

    ipcMain.handle('get-new-sale', async () => {
        const sale = newSalePivot;
        delete newSalePivot;

        const product = await storeProducts.getProduct(sale.idProduct);
        sale.product = product;
        return sale;
    });

    ipcMain.handle('delete-sale', (e, idSale) => {
        const answer = storeSales.deleteSale(idSale);
        return answer;
    });

    let detailsPivot;
    ipcMain.on('add-sell-from-order', async (e, idOrder) => {
        const order = storeOrders.getOrder(idOrder);
        const ordersWindow = returnOrdersWindow();
        const answer = dialog.showMessageBoxSync(ordersWindow, {
            title: `Confirmar Venta por Pedido N ${order.id}`,
            message: `Avanzar a zona de pagos? Cliente: ${order.customer.name}`,
            buttons: ['Confirmar', 'Cancelar'],
        });
        if(answer == 0){
            let totalAmount = 0;
            const articlesQuantity = order.details.length;
            for (const detail of order.details) {
                new Promise(async (a, b) => {
                    const product = await storeProducts.getProduct(detail.idProduct);
                if(order.priceList == 'public'){
                    totalAmount += product.unitPrice;
                } else {
                    totalAmount += product.wholesalerPrice;
                };
                });
            };
            detailsPivot = order.details;
            createPayOrderWindow({totalAmount, articlesQuantity, priceList: order.priceList, idCustomer: order.customer.id});
        };
    });

    ipcMain.handle('get-order-details', () => {
        const details = detailsPivot;
        delete detailsPivot;
        return details;
    });

    ipcMain.on('send-details-order-incompleted', (e, {sessionStorage, priceList, totalAmount, debt, idCustomer, invoicing}) => {
        const customer = storeCustomers.getCustomer(idCustomer);
        const branch = configs.getBranchDataFromConfig();
        const emplooy = {id: 1, name: 'Administrador'};
        if(invoicing == 1){

        } else {
            const cash = totalAmount - debt;
            const payOrderWindow = returnPayOrdersWindow();
            const answer = dialog.showMessageBoxSync(payOrderWindow, {
                title: `Realizar Venta desde Pedido`,
                message: `Cliente: ${customer.name}.
                Monto: $ ${totalAmount}.
                Paga con $ ${cash.toFixed(2)}.
                Debe: $ ${debt}. Agregar restante a CUENTA CORRIENTE?.
                `,
                buttons: ['Confirmar', 'Cancelar'],
            });
            if(answer == 0){
                storeCashRegister.addToBox(configs.getCashRegisterId(), branch.id, totalAmount);
                storeCustomers.addToDebt(idCustomer, debt);
                storeSells.addSell({
                    amount: totalAmount,
                    branch: branch.id, //Modificar cuando se hagan las sesiones.
                    emplooy, //Modificar cuando se hagan las sesiones.
                    customer: {name: customer.name, id: customer.id},
                    howPaid: 'Contado/Cuenta Corriente',
                    howMuchPaid: cash.toFixed(2),
                    details: sessionStorage,
                    priceList,
                });

                payOrderWindow.close();
                const ordersWindow = returnOrdersWindow();
                ordersWindow.webContents.send('confirm-order-sell');
            };
        };
    });

    ipcMain.on('send-details-order-cash', (e, {sessionStorage, priceList, totalAmount, idCustomer, invoicing, amountToBeReturned}) => {
        const customer = storeCustomers.getCustomer(idCustomer);
        const branch = configs.getBranchDataFromConfig();
        const emplooy = {id: 1, name: 'Administrador'};
        if(invoicing == 1){

        } else {
            const payOrderWindow = returnPayOrdersWindow();
            const answer = dialog.showMessageBoxSync(payOrderWindow, {
                title: `Realizar Venta desde Pedido`,
                message: `Cliente: ${customer.name}.
                Monto: $ ${totalAmount}.
                Paga con $ ${totalAmount}.
                Vuelto: $ ${amountToBeReturned}.`,
                buttons: ['Confirmar', 'Cancelar'],
            });
            if(answer == 0){
                storeCashRegister.addToBox(configs.getCashRegisterId(), branch.id, totalAmount);
                storeSells.addSell({
                    amount: totalAmount,
                    branch: branch.id, //Modificar cuando se hagan las sesiones.
                    emplooy, //Modificar cuando se hagan las sesiones.
                    customer: {name: customer.name, id: customer.id},
                    howPaid: 'Efectivo',
                    howMuchPaid: totalAmount,
                    details: sessionStorage,
                    priceList,
                });
                
                payOrderWindow.close();
                const ordersWindow = returnOrdersWindow();
                ordersWindow.webContents.send('confirm-order-sell');
            };
        };
    });


    ipcMain.on('send-details-order-credit', (e, {sessionStorage, priceList, totalAmount, idCustomer, invoicing}) => {
        const customer = storeCustomers.getCustomer(idCustomer);
        const branch = configs.getBranchDataFromConfig();
        const emplooy = {id: 1, name: 'Administrador'};
        if(invoicing == 1){

        } else {
            const payOrderWindow = returnPayOrdersWindow();
            const answer = dialog.showMessageBoxSync(payOrderWindow, {
                title: `Agregar a CUENTA CORRIENTE`,
                message: `Cliente: ${customer.name}`,
                buttons: ['Confirmar', 'Cancelar'],
            });
            if(answer == 0){
                storeSells.addSell({
                    amount: totalAmount,
                    branch: branch.id, //Modificar cuando se hagan las sesiones.
                    emplooy, //Modificar cuando se hagan las sesiones.
                    customer: {name: customer.name, id: customer.id},
                    howPaid: 'Cuenta Corriente',
                    howMuchPaid: 0,
                    details: sessionStorage,
                    priceList,
                });
                
                payOrderWindow.close();
                const ordersWindow = returnOrdersWindow();
                ordersWindow.webContents.send('confirm-order-sell');
            };
        };
    });

};