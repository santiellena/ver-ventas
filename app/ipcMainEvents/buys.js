const { ipcMain, dialog } = require('electron');

const storeSuppliers = require('../components/suppliers/store');

const { mainHandlebars,
        historyHandlebars,
        returnMainWindow,
        returnSuppliersWindow,
        
} = require('../createWindows');

module.exports = ({
    createSuppliersWindow,
    createSuppliersEditWindow
}) => {

    ipcMain.on('load-suppliers-window', () => {
        const suppliers = storeSuppliers.getAllSuppliers();
        if(suppliers != undefined && suppliers != null){
            createSuppliersWindow({suppliers});
        };
    });

    ipcMain.on('load-editsupplier-window', () => {
        const suppliers = storeSuppliers.getAllSuppliers();
        if(suppliers != undefined && suppliers != null){
            createSuppliersEditWindow({suppliers});
        };
    });

};