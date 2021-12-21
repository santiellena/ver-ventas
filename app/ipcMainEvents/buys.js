const { ipcMain, dialog } = require('electron');

const storeSuppliers = require('../components/suppliers/store');
const storeBuys = require('../components/buys/store');
const storeProducts = require('../components/products/store');

const { mainHandlebars,
        historyHandlebars,
        returnMainWindow,
        returnSuppliersWindow,
        returnBuysWindow,
        returnAddBuyWindow,
        returnSearchProductsBuysWindow,
        
} = require('../createWindows');

module.exports = ({
    createSuppliersWindow,
    createSuppliersEditWindow,
    createSuppliersAddWindow,
    createBuysWindow,
    createAddBuyWindow,
    createSearchProductsBuysWindow,
}) => {

    ipcMain.on('load-suppliers-window', () => {
        const suppliers = storeSuppliers.getAllSuppliers();
        if(suppliers != undefined && suppliers != null){
            createSuppliersWindow({suppliers});
        };
    });

    ipcMain.on('load-editsupplier-window', (e, id) => {
        const supplier = storeSuppliers.getSupplier(id);
        if(supplier != undefined && supplier != null){
            createSuppliersEditWindow({supplier});
        };
    });

    ipcMain.on('load-addsupplier-window', () => {
        createSuppliersAddWindow();
    });

    ipcMain.on('delete-supplier', (e, id) => {
        storeSuppliers.deleteSupplier(id);
        const suppliersWindow = returnSuppliersWindow();
        suppliersWindow.webContents.send('delete-supplier-selected');
    });

    let supplierAdded;
    ipcMain.on('add-supplier', (e, {
        supplierName,
        docType,
        numDoc,
        dirDepto,
        dirProv,
        dirPostCode,
        dirCity,
        dirStreet,
        cuit,
        phoneNumber,
        email,
        cbu,
    }) => {
        supplierAdded = storeSuppliers.addSupplier({
        supplierName,    
        docType,
        numDoc,
        dirDepto,
        dirProv,
        dirPostCode,
        dirCity,
        dirStreet,
        cuit,
        phoneNumber,
        email,
        cbu,
        });

        const suppliersWindow = returnSuppliersWindow();

        suppliersWindow.webContents.send('load-new-supplier');
    });
    ipcMain.handle('get-supplier-added', () => {
        const supplier = supplierAdded;
        delete supplierAdded;
        return supplier;
    });

    let supplierEdited;
    ipcMain.on('edit-supplier-info', (e, {
        id,
        supplierName,
        docType,
        numDoc,
        cuit,
        dirProv,
        dirDepto,
        postCode,
        dirCity,
        dirStreet,
        phoneNumber,
        email, 
        cbu,
    }) => {
        if(id, supplierName, docType, numDoc, cuit, dirProv, dirDepto, postCode, dirCity, dirStreet, phoneNumber, email, cbu){
            supplierEdited = storeSuppliers.editSupplier({
                id,
                supplierName,
                docType,
                numDoc,
                cuit,
                dirProv,
                dirDepto,
                postCode,
                dirCity,
                dirStreet,
                phoneNumber,
                email, 
                cbu,
            });
            if(supplierEdited != undefined && supplierEdited != null){

                const suppliersWindow = returnSuppliersWindow();
                suppliersWindow.webContents.send('load-edited-supplier');
            }
            
        };

    });

    ipcMain.handle('get-supplier-edited', () => {
        const edit = supplierEdited;
        delete supplierEdited;
        return edit;
    });

    ipcMain.on('load-buys-window', (e, args) => {
        const buys = storeBuys.getAllBuys();
        if(buys != null){
            createBuysWindow({buys});
        } else {
            createBuysWindow({buys: null});
        };
    });

    ipcMain.handle('search-buys-by-date', (e, { from, to }) => { 
        if(from != undefined && from != null && to != undefined && to != null){
            const buys = storeBuys.getBuysByDate(from, to);

            return buys;
        } else {
            throw new Error('Dates data is invalid');
        };
    });

    ipcMain.handle('get-buys-detail', (e, id) => {
        const details = storeBuys.getBuyDetail(id);
        if(details != null){
            return details;
        } else {
            throw new Error('ID data is invalid');
        };
    });

    ipcMain.on('load-addBuys-window', () => {
        createAddBuyWindow();
    });

    ipcMain.on('load-searchproduct-buys-window', () => {
        createSearchProductsBuysWindow();
    });

    let idAddedToBuy;
    ipcMain.on('load-id-to-buy', (e, id) => {
        const addBuyWindow = returnAddBuyWindow();
        addBuyWindow.webContents.send('added-to-buy');
        idAddedToBuy = id;
    });

    ipcMain.handle('get-added-tobuy', (e, args) => {
        const id = idAddedToBuy;
        delete idAddedToBuy;
        return id;
    });

    ipcMain.on('buys-product-alreadyadded', () => {
        const searchProductsBuySWindow = returnSearchProductsBuysWindow();

        dialog.showMessageBoxSync(searchProductsBuySWindow, {
            title: 'PRODUCTO YA AGREGADO',
            message: 'El producto ya fue agregado previamente...',
            type: 'info',
            buttons: ['Cerrar'],
        });
    });


    ipcMain.on('product-not-found', () => {
        const searchProductsBuySWindow = returnSearchProductsBuysWindow();

        dialog.showMessageBoxSync(searchProductsBuySWindow, {
            title: 'Producto no encontrado...',
            message: 'ERROR: El producto no fue encontrado...',
            type: 'error',
            buttons: ['Cerrar'],
        });
    });

    ipcMain.on('added-productbuy', () => {
        const searchProductsBuySWindow = returnSearchProductsBuysWindow();

        searchProductsBuySWindow.close();
    });

    ipcMain.handle('get-suppliers', () => {
        const suppliers = storeSuppliers.getAllSuppliers();

        if(suppliers){
            return suppliers;
        } else {
            return null;
        }
    });

    ipcMain.on('buy-end', (e, { items, supplierId, howPaid }) => {
        const emplooy = 'Administrador';
        const branch = 'Principal';
        const supplier = storeSuppliers.getSupplier(supplierId);

        if(items && supplier && howPaid) {
            const addBuyWindow = returnAddBuyWindow();

            const response = dialog.showMessageBoxSync(addBuyWindow, {
                title: 'FINALIZAR COMPRA',
                message: 'Realmente desea finalizar la carga de la compra de productos?',
                type: 'question',
                buttons: ['Cancelar','Confirmar'],
            });

            if(response == 1){
                let details = [];
                const actualDate = new Date();
                const date = `${actualDate.getFullYear()}/${actualDate.getMonth()+1}/${actualDate.getDate()}`;

                items.map(e => {
                    const index1 = e[1].indexOf('-');
                    const index2 = e[1].indexOf('/');
                    const index3 = e[1].indexOf('_');
                    const quantity = e[1].slice(0,index1);
                    const price = e[1].slice(index1+1, index2);
                    const wholesalerPrice = e[1].slice(index2 +1, index3);
                    const unitPrice = e[1].slice(index3+1, e[1].length);
                    const detail = {
                        product: e[0],
                        quantity,
                        price,
                        wholesalerPrice,
                        unitPrice,
                    };

                    details.push(detail);
                });
                
                storeProducts.updateStockAndPrices(details);

                storeBuys.addBuy({
                    branch, 
                    emplooy,
                    supplier,
                    howPaid,
                    details,
                    date,
                });
              
                addBuyWindow.webContents.send('buy-confirmation');
            } else {

            }
        }
    });
};