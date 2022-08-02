const { ipcMain, dialog } = require('electron');

const storeProducts = require('../components/products/store');
const storeCustomers = require('../components/customers/store');
const storeOrders = require('../components/orders/store');
const storeSells = require('../components/sells/store');
const storeMaintenance = require('../components/maintenance/store');
const storeCashRegister = require('../components/cashRegister/store');
const storeSales = require('../components/sales/store');
const auth = require('../config/auth');
const configs = require('../config/config.js');

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

    ipcMain.on('open-sells-history', async () => {
        const sells = await storeSells.getAllSells();
        sells.reverse();
        createSellsHistoryWindow({sells});
    });

    ipcMain.handle('get-sell-detail', async (e, id) => {
        const sellDetail = await storeSells.getSellDetail(id);
        if(sellDetail){
            return sellDetail;
        };
    });

    ipcMain.handle('search-sells-by-date', async (e, {fromDate, toDate}) => {
        const sellsByDate = await storeSells.getSellsByDate(fromDate, toDate);
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
    ipcMain.on('sell-cash-confirmation', async (e, args) => {
        const paymentWindow = returnPaymentWindow();
        const { totalAmount, amountToBeReturned, howMuchCash, invoicing } = args;
        // if(invoicing == 1){
        //     const response = dialog.showMessageBoxSync(paymentWindow, {
        //         title: 'Facturar Venta?',
        //         message: 'Si confirma, se abrirá el menu de facturación.',
        //         buttons: ['Confirmar', 'Cancelar'],
        //     });
        //     if(response == 0){
        //         //facturar
        //     };
        // } else {
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
    
            await storeCashRegister.addToBox(boxConfig, branchConfig.id, totalAmount);
            paymentWindow.close();
            const mainWindow = returnMainWindow();
            amountCashPivot = totalAmount;
            mainWindow.webContents.send('get-sells-details');
    });

    ipcMain.on('get-sells-details', async (e, {sessionStorage, priceList}) => {
        const totalAmount = amountCashPivot;
        delete amountCashPivot;
        const branchConfig = configs.getBranchDataFromConfig();
        const user = await auth.getUserSessionInfo();
        await storeSells.addSell({
            totalAmount,
            idBranch: branchConfig.id,
            idUser: user.id,
            idCustomer: 1,
            howPaid: 'Efectivo',
            howMuchPaid: totalAmount,
            details: sessionStorage,
            priceList,
        });
        const mainWindow = returnMainWindow();
        mainWindow.webContents.send('clear-product-list');
    });

    ipcMain.on('sell-cash-incompleted', async  (e, {debt, totalAmount, invoicing}) => {
        //const paymentWindow = returnPaymentWindow();
        // if(invoicing == 1){
        //     const response = dialog.showMessageBoxSync(paymentWindow, {
        //         title: 'Facturar Venta?',
        //         message: 'Si confirma, se abrirá el menu de facturación.',
        //         buttons: ['Confirmar', 'Cancelar'],
        //     });
        //     if(response == 0 ){
        //         //facturar
        //     } else {
        //         return
        //     };
        // } else {
            const customers = await storeCustomers.getAllCustomers();
            createCustomerListWindow({ totalAmount: debt, totalAmountPlusDebt: parseFloat(totalAmount), customers, howPaid: 'Efectivo/Cuenta Corriente', operation: 'pay' });
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

    ipcMain.on('get-sells-details-card', async (e, {sessionStorage, priceList}) => {
        const totalAmount = amountPivotCard;
        delete amountPivotCard;
        const user = await auth.getUserSessionInfo();
        const branch = configs.getBranchDataFromConfig();
        await storeSells.addSell({
            totalAmount,
            idBranch: branch.id,
            idUser: user.id, //Modificar cuando se hagan las sesiones.
            idCustomer: 1,
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
        return await storeMaintenance.getTaxPercentage();
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

    ipcMain.on('load-customer-list', async (e, {totalAmount, operation, invoicing}) => {
        const customers = await storeCustomers.getAllCustomers();
        // if(invoicing == 1){
        //     const response = dialog.showMessageBoxSync(paymentWindow, {
        //         title: 'Facturar Venta?',
        //         message: 'Si confirma, se abrirá el menu de facturación.',
        //         buttons: ['Confirmar', 'Cancelar'],
        //     });
        //     if(response == 0 ){
        //         //facturar
        //     } else {
        //         return
        //     };
        // } else {
            
            createCustomerListWindow({
                totalAmount,
                customers,
                totalAmountPlusDebt: totalAmount,
                howPaid: 'Cuenta Corriente',
                operation,        
            });
    });

    let customerCreditPivot, amountCreditPivot, totalAmountPlusDebtPivot, howPaidPivot;
    ipcMain.on('select-customer-whopays', async (e, args) => {

        let customer;
        if(args.id != null && args.id != undefined){
           customer = await storeCustomers.getCustomer(args.id);
        };

        const customerList = returnCustomerListWindow();
        const customerConfirmation = dialog.showMessageBoxSync(customerList, {
            title: `Cliente Seleccionado: ${customer.id} ${customer.person.name}`,
            message: 'Confirmar cuenta corriente',
            type: 'info',
            buttons: ['Cancelar', 'Confirmar'],
        });

        if(customerConfirmation == 1){
            if (customer.id == 1){
                dialog.showMessageBoxSync(customerList, {
                    title: `Selección inválida `,
                    message: `No puede agregar deuda a esta entidad, seleccione una correcta.`,
                    buttons: ['Cerrar'],
                });
            } else {
                customerList.close();
                const paymentWindow = returnPaymentWindow();
                const sellConfirmation = dialog.showMessageBoxSync(paymentWindow, {
                    title: `Cliente: ${customer.id} ${customer.person.name}`,
                    message: `Monto: $ ${args.totalAmount}. 
                    Agregar a cuenta corriente.`,
                    type: 'info',
                    buttons: ['Cancelar','Confirmar'],
                });
                if(sellConfirmation == 1){
                    const mainWindow = returnMainWindow();
                    //confirmar venta function, update deuda, update stock, update todo
                    paymentWindow.close();
                    await storeCustomers.addToDebt(customer.id, args.totalAmount);
                    const toAdd = parseFloat(args.totalAmountPlusDebt) - parseFloat(args.totalAmount);
                    if(toAdd > 0){
                        await storeCashRegister.addToBox(configs.getCashRegisterId(), configs.getBranchDataFromConfig().id, toAdd);
                    };
                    mainWindow.webContents.send('get-sells-details-credit');
                    amountCreditPivot = args.totalAmount;
                    totalAmountPlusDebtPivot = args.totalAmountPlusDebt;
                    customerCreditPivot = customer;
                    howPaidPivot = args.howPaid;
                };
            };
            
        };
        
    });

    ipcMain.on('get-sells-details-credit', async (e, {sessionStorage, priceList}) => {
        const totalDebt = amountCreditPivot;
        const totalAmountPlusDebt = totalAmountPlusDebtPivot;
        const customer = customerCreditPivot;
        const howPaid = howPaidPivot;
        delete amountCreditPivot;
        delete totalAmountPlusDebtPivot;
        delete howPaidPivot;
        delete customerCreditPivot;
        const branch = configs.getBranchDataFromConfig();
        const user = await auth.getUserSessionInfo();
        await storeSells.addSell({
            totalAmount: totalAmountPlusDebt,
            idBranch: branch.id,
            idUser: user.id,
            idCustomer: customer.id,
            howPaid,
            howMuchPaid: parseFloat(totalAmountPlusDebt) - parseFloat(totalDebt),
            details: sessionStorage,
            priceList,
        });
        const mainWindow = returnMainWindow();
        mainWindow.webContents.send('clear-product-list');
        
    });

    ipcMain.on('load-orders-window', async  (e, args) => {
        const orders = await storeOrders.getAllOrders();
        createOrdersWindow({orders});
    });

    ipcMain.handle('get-order', async (e, id) => {
        const order = await storeOrders.getOrder(id);
        if(order != undefined && order != null){
            return order;
        }
        else {
            return null;
        }
    });

    ipcMain.handle('get-orders-bydate', async (e, { from, to }) => {
        if(from != undefined && from != null && to != undefined && to != null){
            const orders = await storeOrders.getOrdersByDate(from, to);

            return orders;
        } else {
            throw new Error('Dates data is invalid');
        }
    });
    
    ipcMain.handle('get-orders', async () => {

        return await storeOrders.getAllOrders();
    });

    let customerOrderPivot, amountOrderPivot = 0;
    ipcMain.on('select-customer-for-order', async (e, {id, totalAmount}) => {
        let customer;
        if(id != null && id != undefined){
           customer = await storeCustomers.getCustomer(id);
        };

        const customerList = returnCustomerListWindow();
        const customerConfirmation = dialog.showMessageBoxSync(customerList, {
            title: `Cliente Seleccionado: ${customer.id} ${customer.person.name}`,
            message: 'Confirmar Cliente',
            type: 'info',
            buttons: ['Cancelar', 'Confirmar'],
        });

        if(customerConfirmation == 1){
            customerList.close();
            const paymentWindow = returnPaymentWindow();

            const sellConfirmation = dialog.showMessageBoxSync(paymentWindow, {
                title: `Cliente: ${customer.id} ${customer.person.name}`,
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

    ipcMain.on('get-sells-details-order', async (e, {sessionStorage, priceList}) => {
        const branch = configs.getBranchDataFromConfig();
        const totalAmount = amountOrderPivot;
        delete amountOrderPivot;
        const customer = customerOrderPivot;
        delete customerOrderPivot;
        const user = await auth.getUserSessionInfo();
        await storeOrders.addOrder({
            totalAmount,
            idBranch: branch.id,
            idUser: user.id,
            idCustomer: customer.id,
            details: sessionStorage,
            priceList,
        });
        const mainWindow = returnMainWindow();
        mainWindow.webContents.send('clear-product-list');
    });

    ipcMain.handle('delete-sell', async (e, id) => {
        if(id){
            const sellsWindow = returnSellsHistoryWindow();
            const sell = await storeSells.getSell(id);
            const answer = dialog.showMessageBoxSync(sellsWindow, {
                title: `Eliminar venta N ${sell.id}`,
                message: `Realmente desea eliminar de forma permanente? Cliente: ${sell.customer.person.name}`,
                type: 'question',
                buttons: ['Cancelar', 'Confirmar'],
            });

            if(answer == 1){
                await storeSells.deleteSell(id);
                const substract = parseFloat(sell.totalAmount) - parseFloat(sell.howMuchPaid);
                await storeCustomers.removeFromDebts(sell.customer.id, substract);
                const branch = configs.getBranchDataFromConfig();
                await storeCashRegister.substractToBox(configs.getCashRegisterId(), branch.id, sell.howMuchPaid);
                return true;
            } else {
                return false;
            }
        }
    });

    ipcMain.handle('delete-order', async (e, id) => {
        if(id){
            const ordersWindow = returnOrdersWindow();
            const order = await storeOrders.getOrder(id);
            const answer = dialog.showMessageBoxSync(ordersWindow, {
                title: `Eliminar pedido N ${order.id}`,
                message: `Realmente desea eliminar de forma permanente? Cliente: ${order.customer.person.name}`,
                type: 'question',
                buttons: ['Cancelar', 'Confirmar'],
            });

            if(answer == 1){
                await storeOrders.deleteOrder(id);
                return true;
            } else {
                return false;
            }
        }
    });

    ipcMain.on('delete-order', async (e, id) => {
        if(id){
            const ordersWindow = returnOrdersWindow();
            const order = await storeOrders.getOrder(id);
            const answer = dialog.showMessageBoxSync(ordersWindow, {
                title: `Pedido N ${order.id}`,
                message: `Pedido concretado como venta. Cliente: ${order.customer.person.name}`,
                type: 'info',
                buttons: ['Cerrar'],
            });
            await storeOrders.deleteOrder(id);
        }
    });

    ipcMain.handle('get-product-discount', async (e, idProduct) => {
        if(idProduct){
            const discount = await storeSales.getSaleByProduct(idProduct);
            if(discount) return discount
            else return 0;
        };
    });

    ipcMain.on('load-sales-page', async () => {
        const sales = await storeSales.getAllSalesWithProducts();
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
        const newSale = await storeSales.addSale({
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
                await storeProducts.changeSaleStatus(idProduct);
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

    ipcMain.handle('delete-sale', async (e, idSale) => {
        const answer = await storeSales.deleteSale(idSale);
        return answer;
    });

    let detailsPivot;
    ipcMain.on('add-sell-from-order', async (e, idOrder) => {
        const order = await storeOrders.getOrder(idOrder);
        const ordersWindow = returnOrdersWindow();
        const answer = dialog.showMessageBoxSync(ordersWindow, {
            title: `Confirmar Venta por Pedido N ${order.id}`,
            message: `Avanzar a zona de pagos? Cliente: ${order.customer.person.name}`,
            buttons: ['Confirmar', 'Cancelar'],
        });
        if(answer == 0){
            let totalAmount = 0;
            const articlesQuantity = order.details.length;
            for (const detail of order.details) {
                if(order.priceList == 'public'){
                    totalAmount += parseFloat(detail.unitPrice) * parseFloat(detail.OrderProduct.quantity);
                } else {
                    totalAmount += parseFloat(detail.wholesalerPrice) * parseFloat(detail.OrderProduct.quantity);
                };
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

    ipcMain.on('send-details-order-incompleted', async (e, {sessionStorage, priceList, totalAmount, debt, idCustomer, invoicing}) => {
        const customer = await storeCustomers.getCustomer(idCustomer);
        const branch = configs.getBranchDataFromConfig();
        const user = await auth.getUserSessionInfo();
            const cash = totalAmount - debt;
            const payOrderWindow = returnPayOrdersWindow();
            const answer = dialog.showMessageBoxSync(payOrderWindow, {
                title: `Realizar Venta desde Pedido`,
                message: `Cliente: ${customer.person.name}.
                Monto: $ ${totalAmount}.
                Paga con $ ${cash.toFixed(2)}.
                Debe: $ ${debt}. Agregar restante a CUENTA CORRIENTE?.
                `,
                buttons: ['Confirmar', 'Cancelar'],
            });
            if(answer == 0){
                await storeCashRegister.addToBox(configs.getCashRegisterId(), branch.id, cash.toFixed(2));
                await storeCustomers.addToDebt(idCustomer, debt);
                await storeSells.addSell({
                    totalAmount,
                    idBranch: branch.id, 
                    idUser: user.id, 
                    idCustomer: customer.id,
                    howPaid: 'Efectivo/Cuenta Corriente',
                    howMuchPaid: cash.toFixed(2),
                    details: sessionStorage,
                    priceList,
                });

                payOrderWindow.close();
                const ordersWindow = returnOrdersWindow();
                ordersWindow.webContents.send('confirm-order-sell');
            };
    });

    ipcMain.on('send-details-order-cash', async (e, {sessionStorage, priceList, totalAmount, idCustomer, invoicing, amountToBeReturned}) => {
        const customer = await storeCustomers.getCustomer(idCustomer);
        const branch = configs.getBranchDataFromConfig();
        const user = await auth.getUserSessionInfo();
            const payOrderWindow = returnPayOrdersWindow();
            const answer = dialog.showMessageBoxSync(payOrderWindow, {
                title: `Realizar Venta desde Pedido`,
                message: `Cliente: ${customer.person.name}.
                Monto: $ ${totalAmount}.
                Paga con $ ${totalAmount}.
                Vuelto: $ ${amountToBeReturned}.`,
                buttons: ['Confirmar', 'Cancelar'],
            });
            if(answer == 0){
                await storeCashRegister.addToBox(configs.getCashRegisterId(), branch.id, totalAmount);
                await storeSells.addSell({
                    totalAmount,
                    idBranch: branch.id, 
                    idUser: user.id, 
                    idCustomer,
                    howPaid: 'Efectivo',
                    howMuchPaid: totalAmount,
                    details: sessionStorage,
                    priceList,
                });
                await storeOrders.deleteOrder()
                
                payOrderWindow.close();
                const ordersWindow = returnOrdersWindow();
                ordersWindow.webContents.send('confirm-order-sell');
            };
    });


    ipcMain.on('send-details-order-credit', async (e, {sessionStorage, priceList, totalAmount, idCustomer, invoicing}) => {
        const customer = await storeCustomers.getCustomer(idCustomer);
        const branch = configs.getBranchDataFromConfig();
        const user = await auth.getUserSessionInfo();
            const payOrderWindow = returnPayOrdersWindow();
            const answer = dialog.showMessageBoxSync(payOrderWindow, {
                title: `Agregar a CUENTA CORRIENTE`,
                message: `Cliente: ${customer.person.name}`,
                buttons: ['Confirmar', 'Cancelar'],
            });
            if(answer == 0){
                await storeCustomers.addToDebt(idCustomer, totalAmount);
                await storeSells.addSell({
                    totalAmount,
                    idBranch: branch.id,
                    idUser: user.id,
                    idCustomer,
                    howPaid: 'Cuenta Corriente',
                    howMuchPaid: 0,
                    details: sessionStorage,
                    priceList,
                });
                
                payOrderWindow.close();
                const ordersWindow = returnOrdersWindow();
                ordersWindow.webContents.send('confirm-order-sell');
            };
    });


    ipcMain.on('send-details-order-card', async (e, {sessionStorage, priceList, totalAmount, idCustomer, invoicing}) => {
        const customer = await storeCustomers.getCustomer(idCustomer);
        const branch = configs.getBranchDataFromConfig();
        const user = await auth.getUserSessionInfo();
            const payOrderWindow = returnPayOrdersWindow();
            const answer = dialog.showMessageBoxSync(payOrderWindow, {
                title: `Pago con tarjeta de CRÉDITO/DÉBITO.`,
                message: `Cliente: ${customer.person.name}. 
                Ingrese "CONFIRMAR" solo si la tarjeta fue aceptada.`,
                buttons: ['Confirmar', 'Cancelar'],
            });
            if(answer == 0){
                await storeSells.addSell({
                    totalAmount,
                    idBranch: branch.id,
                    idUser: user.id,
                    idCustomer,
                    howPaid: 'Tarjeta',
                    howMuchPaid: 0,
                    details: sessionStorage,
                    priceList,
                });
                
                payOrderWindow.close();
                const ordersWindow = returnOrdersWindow();
                ordersWindow.webContents.send('confirm-order-sell');
            };
    });

};