const { ipcMain, dialog } = require('electron');

const storeProducts = require('../components/products/store');

const { mainHandlebars,
        historyHandlebars,
        createStockWindow,
        
} = require('../createWindows');

module.exports = ({
    
}) => {
    
    ipcMain.on('load-stock-window', () => {
        const products = storeProducts.getAllProducts();
        if(products){

            createStockWindow({products});
        };
    });
    
};