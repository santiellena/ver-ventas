const { ipcMain, dialog } = require('electron');

const storeProducts = require('../components/products/store');
const storeDepartments = require('../components/departments/store');
const storeMeasures = require('../components/unitMeasures/store');
const storeLocations = require('../components/locations/store');

const { mainHandlebars,
        historyHandlebars,
        createStockWindow,
        createAddProductWindow,
        createEditProductWindow,
        createDeleteProductWindow,
        createDepartmentsWindow,
        createMissingStockWindow,
        returnStockWindow,
        returnDeleteProductWindow,
        returnEditProductWindow,
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
        const departments = storeDepartments.getAllDepartments();
        const locationsShow = storeLocations.getAllLocationsShow();
        const locationsStore = storeLocations.getAllLocationsStore();
        const measures = storeMeasures.getAllMeasures();

        if(departments, locationsShow, locationsStore, measures){
            createAddProductWindow({departments, locationsShow, locationsStore, measures});
        };
        
    });

    ipcMain.on('load-editproduct-window', () => {
        const departments = storeDepartments.getAllDepartments();
        const locationsShow = storeLocations.getAllLocationsShow();
        const locationsStore = storeLocations.getAllLocationsStore();
        const measures = storeMeasures.getAllMeasures();

        if(departments, locationsShow, locationsStore, measures){
            createEditProductWindow({departments, locationsShow, locationsStore, measures});
        }
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

    let departmentUpdate;
    ipcMain.handle('new-department', (e, description) => {
        if(description){
            const newDepartment = storeDepartments.addDepartment(description);
            const stockWindow = returnStockWindow();
            stockWindow.webContents.send('update-departments-list');
            departmentUpdate = newDepartment;

            return newDepartment;
        };
    });
    
    ipcMain.handle('get-department-update', () => {
        if (departmentUpdate != undefined){
            const toReturn = departmentUpdate;
            delete departmentUpdate;

            return toReturn;
        }
    });

    let idDepartment;
    ipcMain.on('delete-department', (e, id) => {
        storeDepartments.deleteDepartment(id);

        const stockWindow = returnStockWindow();
        stockWindow.webContents.send('update-departments-list-delete');
        idDepartment = id;
    });

    ipcMain.handle('deleted-department', () => {
        const idReturn = idDepartment;
        delete idDepartment;
        return idReturn;
    });

    let productPivot;
    ipcMain.on('new-product', (e, {
        id,
        description,
        buyPrice,
        wholesalerPrice,
        unitPrice,
        initialStock,
        departmentId,
        locationShowId,
        locationStoreId,
        unitMeasureId,
    }) => {
        const locationStore = storeLocations.getLocationStore(locationStoreId);
        const locationShow = storeLocations.getLocationShow(locationShowId);
        const location = [ locationStore.description, locationShow.description ];
        const department = storeDepartments.getDepartment(departmentId);
        const unitMeasure = storeMeasures.getMeasure(unitMeasureId);
        
        const newProduct = storeProducts.addProduct({
            id,
            description,
            buyPrice,
            wholesalerPrice,
            unitPrice,
            stock: initialStock,
            location,
            department,
            unitMeasure: `${unitMeasure.longDescription}`,
        });

        if(newProduct != undefined && newProduct != null){
            productPivot = newProduct;
            const stockWindow = returnStockWindow();
            stockWindow.webContents.send('update-newproduct-list');
        }
        
    });


    ipcMain.handle('get-newproduct-tolist', () => {
        const newProduct = productPivot;
        delete productPivot;
        return newProduct;
    });

    ipcMain.handle('check-product-existance', (e, id) => {
        const check = storeProducts.checkExistance(id);

        return check;
    });

    let idDeleted;
    ipcMain.on('delete-product', (e, id) => {
        if(id){
            storeProducts.deleteProduct(id);

            const stockWindow = returnStockWindow();
            const deleteProductWindow = returnDeleteProductWindow();

            deleteProductWindow.webContents.send('confirm-product-delete');
            stockWindow.webContents.send('update-products-list-bydelete');

            idDeleted = id;
        };
    });

    ipcMain.handle('get-deleted-id', () => {
        const id = idDeleted;
        delete idDeleted;
        return id;
    });

    let modified;
    ipcMain.on('edit-product', (e, {
        id,
        description,
        buyPrice,
        wholesalerPrice,
        unitPrice,
        stock,
        departmentId,
        locationShowId,
        locationStoreId,
        unitMeasureId,
    }) => {

        if(id && description && buyPrice && wholesalerPrice && unitPrice && stock && departmentId && locationShowId && locationStoreId && unitMeasureId) {
            const editedProduct = storeProducts.editProduct({
                id,
                description,
                buyPrice,
                wholesalerPrice,
                unitPrice,
                stock,
                departmentId,
                locationShowId,
                locationStoreId,
                unitMeasureId,
            });
            
            const stockWindow = returnStockWindow();
            const editProductWindow = returnEditProductWindow();

            editProductWindow.webContents.send('confirm-product-edit');
            stockWindow.webContents.send('update-products-list-byedit');

            modified = editedProduct;
        }

        ipcMain.handle('get-modified-id', () => {
            const editedProduct = modified;
            delete modified;
            return editedProduct; 
        });
    });

    ipcMain.on('load-missing-stock-window', () => {
        const missing = storeProducts.getProductsMissing();
        createMissingStockWindow({missing});
    });
};