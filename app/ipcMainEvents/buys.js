const { ipcMain, dialog } = require('electron');
const dates = require('../config/date');

const storeSuppliers = require('../components/suppliers/store');
const storeBuys = require('../components/buys/store');
const storeProducts = require('../components/products/store');
const storeDocTypes = require('../components/docTypes/store');
const storeDirections = require('../components/directions/store');
const auth = require('../config/auth');

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

    ipcMain.on('load-suppliers-window', async () => {
        const suppliers = await storeSuppliers.getAllSuppliers();
        if(suppliers != undefined && suppliers != null){
            createSuppliersWindow({suppliers});
        };
    });

    ipcMain.on('load-editsupplier-window', async (e, id) => {
        const supplier = await storeSuppliers.getSupplier(id);
        const docTypes = storeDocTypes.getAllDocTypes();
        const provinces = storeDirections.getAllProvinces();
        const object = JSON.parse(provinces);
        if(supplier != undefined && supplier != null){
            createSuppliersEditWindow({supplier, docTypes, provinces: object.provincias});
        };
    });

    ipcMain.on('load-addsupplier-window', async () => {
        const docTypes = await storeDocTypes.getAllDocTypes();
        const provinces = storeDirections.getAllProvinces();
        const object = JSON.parse(provinces);
        createSuppliersAddWindow({docTypes, provinces: object.provincias});
    });

    ipcMain.on('delete-supplier', async (e, id) => {
        await storeSuppliers.deleteSupplier(id);
        const suppliersWindow = returnSuppliersWindow();
        suppliersWindow.webContents.send('delete-supplier-selected');
    });

    ipcMain.handle('get-supplier', async (e, id) => {
        return await storeSuppliers.getSupplier(id);
    });

    let supplierAdded;
    ipcMain.on('add-supplier', async (e, {
        supplierName,    
        docType,
        numDoc,
        idDirDepartment,
        idDirProvince,
        dirPostCode,
        idDirCity,
        dirStreet,
        cuit,
        phoneNumber,
        email,
        cbu,
    }) => {
        supplierAdded = await storeSuppliers.addSupplier({
        supplierName,    
        docType,
        numDoc,
        idDirDepartment,
        idDirProvince,
        dirPostCode,
        idDirCity,
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
    ipcMain.on('edit-supplier-info', async (e, {
        id,
        supplierName,
        docType,
        numDoc,
        cuit,
        idDirProvince,
        idDirDepartment,
        dirPostCode,
        idDirCity,
        dirStreet,
        phoneNumber,
        email, 
        cbu,
    }) => {
        if(id, supplierName, docType, numDoc, cuit, idDirProvince, idDirDepartment, dirPostCode, idDirCity, dirStreet, phoneNumber, email, cbu){
            supplierEdited = await storeSuppliers.editSupplier({
                id,
                supplierName,
                docType,
                numDoc,
                cuit,
                idDirProvince,
                idDirDepartment,
                dirPostCode,
                idDirCity,
                dirStreet,
                phoneNumber,
                email, 
                cbu,
            });
            if(supplierEdited != undefined && supplierEdited != null){

                const suppliersWindow = returnSuppliersWindow();
                suppliersWindow.webContents.send('load-edited-supplier');
            };
            
        };

    });

    ipcMain.handle('get-supplier-edited', () => {
        const edit = supplierEdited;
        delete supplierEdited;
        return edit;
    });

    ipcMain.on('load-buys-window', async (e, args) => {
        const buys = await storeBuys.getAllBuys();
        if(buys != null){
            createBuysWindow({buys});
        } else {
            createBuysWindow({buys: null});
        };
    });

    ipcMain.handle('search-buys-by-date', async (e, { from, to }) => { 
        if(from != undefined && from != null && to != undefined && to != null){
            const buys = await storeBuys.getBuysByDate(from, to);

            return buys;
        } else {
            throw new Error('Dates data is invalid');
        };
    });

    ipcMain.handle('get-buys-detail', async (e, id) => {
        const details = await storeBuys.getBuyDetail(id);
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

    ipcMain.handle('get-suppliers', async () => {
        const suppliers = await storeSuppliers.getAllSuppliers();

        if(suppliers){
            return suppliers;
        } else {
            return null;
        }
    });

    ipcMain.on('buy-end', async (e, { items, supplierId, howPaid }) => {
        const emplooy = await auth.getUserSessionInfo();
        const branch = 'Principal';
        const supplier = await storeSuppliers.getSupplier(supplierId);

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
                const date = dates.actualDate();

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
                
                await storeProducts.updateStockAndPrices(details);

                await storeBuys.addBuy({
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

    ipcMain.handle('delete-buy', async (e, id) => {
        if(id){
            const buysWindow = returnBuysWindow();
            const buy = await storeBuys.getBuy(id);
            const response = dialog.showMessageBoxSync(buysWindow, {
                title: `Eliminar compra / ingreso N ${buy.id}`,
                message: `Una vez eliminado, no se podrá recuperar!`,
                type: 'question',
                buttons: ['Cancelar', 'Confirmar'],
            });

            if(response == 1) {

                await storeBuys.deleteBuy(id);
                return true;
            } else{
                return false;
            }
            
        };
    });
};