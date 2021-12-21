const { ipcMain, dialog } = require('electron');

const storeProducts = require('../components/products/store');
const storeDepartments = require('../components/departments/store');

const { mainHandlebars,
        historyHandlebars,
        createStockWindow,
        createAddProductWindow,
        createEditProductWindow,
        createDeleteProductWindow,
        createDepartmentsWindow,
        
} = require('../createWindows');

module.exports = ({
    
}) => {
    
    ipcMain.on('load-stock-window', () => {
        const products = storeProducts.getAllProducts();
        if(products){

            createStockWindow({products});
        };
    });
    
    ipcMain.handle('get-buys-profitandinvestment', () => {
        const products = storeProducts.getAllProducts();
        const iterableArray = Object.entries(products);

        let investment = 0;
        let posibleProfit = 0;

        for (const product of iterableArray) {
            investment += product[1].buyPrice * product[1].stock;
            posibleProfit += product[1].unitPrice * product[1].stock;
        };

        return { investment, profit: posibleProfit };
    });

    ipcMain.on('load-addproduct-window', () => {
        createAddProductWindow();
    });

    ipcMain.on('load-editproduct-window', () => {
        createEditProductWindow();
    });

    ipcMain.on('load-deleteproduct-window', () => {
        createDeleteProductWindow();
    });

    ipcMain.on('load-departments-window', () => {
        const departments = storeDepartments.getAllDepartments();
        
        if(departments){
            createDepartmentsWindow({departments});
        }
    });

    ipcMain.handle('get-departments', () => {
        const departments = storeDepartments.getAllDepartments();

        if(departments){
            return departments;
        }
    });

};