const { ipcMain, dialog } = require('electron');

const storeSuppliers = require('../components/suppliers/store');

const { mainHandlebars,
        historyHandlebars,
        returnMainWindow,
        returnSuppliersWindow,
        
} = require('../createWindows');

module.exports = ({
    createSuppliersWindow,
    createSuppliersEditWindow,
    createSuppliersAddWindow,
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

};