const { ipcMain } = require('electron');

const storeProducts = require('../components/products/store');
const storeDepartments = require('../components/departments/store');
const storeMeasures = require('../components/unitMeasures/store');
const storeLocations = require('../components/locations/store');

const { 
        createStockWindow,
        createAddProductWindow,
        createEditProductWindow,
        createDeleteProductWindow,
        createDepartmentsWindow,
        createMissingStockWindow,
        createLocationsWindow,
        returnStockWindow,
        returnDeleteProductWindow,
        returnEditProductWindow,
} = require('../createWindows');

module.exports = ({
    
}) => {
    
    ipcMain.on('load-stock-window', async () => {
        const products = await storeProducts.getAllProducts();
        if(products){
            createStockWindow({products});
        };
    });

    ipcMain.on('load-locations-window', async () => {
        const store = await storeLocations.getAllLocationsStore();
        const exposition = await storeLocations.getAllLocationsShow();

        if(store && exposition){
            createLocationsWindow({store, exposition});
        };
    });

    ipcMain.handle('new-location-exposition', async (e, description) => {
        return await storeLocations.createLocationExposition(description);
    });

    ipcMain.handle('new-location-store', async (e, description) => {
        return await storeLocations.createLocationStore(description);
    });

    ipcMain.on('delete-location-exposition', async (e, id) => {
        await storeLocations.deleteLocationExposition(id);
    });

    ipcMain.on('delete-location-store', async (e, id) => {
        await storeLocations.deleteLocationStore(id);
    });
    
    ipcMain.handle('get-buys-profitandinvestment', async () => {
        const products = await storeProducts.getAllProducts();

        let investment = 0;
        let posibleProfit = 0;

        for (const product of products) {
            investment += product.buyPrice * product.stock;
            posibleProfit += product.unitPrice * product.stock;
        };

        return { investment, profit: posibleProfit };
    });

    ipcMain.on('load-addproduct-window', async () => {
        const departments = await storeDepartments.getAllDepartments();
        const locationsShow = await storeLocations.getAllLocationsShow();
        const locationsStore = await storeLocations.getAllLocationsStore();
        const measures = await storeMeasures.getAllMeasures();

        if(departments, locationsShow, locationsStore, measures){
            createAddProductWindow({departments, locationsShow, locationsStore, measures});
        };
        
    });

    ipcMain.on('load-editproduct-window', async () => {
        const departments = await storeDepartments.getAllDepartments();
        const locationsShow = await storeLocations.getAllLocationsShow();
        const locationsStore = await storeLocations.getAllLocationsStore();
        const measures = await storeMeasures.getAllMeasures();

        if(departments, locationsShow, locationsStore, measures){
            createEditProductWindow({departments, locationsShow, locationsStore, measures});
        }
    });

    ipcMain.on('load-deleteproduct-window', () => {
        createDeleteProductWindow();
    });

    ipcMain.on('load-departments-window', async () => {
        const departments = await storeDepartments.getAllDepartments();
        
        if(departments){
            createDepartmentsWindow({departments});
        }
    });

    ipcMain.handle('get-departments', async () => {
        const departments = await storeDepartments.getAllDepartments();

        if(departments){
            return departments;
        }
    });

    let departmentUpdate;
    ipcMain.handle('new-department', async (e, description) => {
        if(description){
            const newDepartment = await storeDepartments.addDepartment(description);
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
    ipcMain.on('delete-department', async (e, id) => {
        await storeDepartments.deleteDepartment(id);

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
    ipcMain.on('new-product', async (e, {
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
        stockMin,
    }) => {
        const newProduct = await storeProducts.addProduct({
            id,
            description,
            buyPrice,
            wholesalerPrice,
            unitPrice,
            stock: initialStock,
            idStore: locationStoreId,
            idExposition: locationShowId,
            department: departmentId,
            unitMeasure: unitMeasureId,
            stockMin,
        });

        if(newProduct != undefined && newProduct != null){
            productPivot = newProduct;
            const stockWindow = returnStockWindow();
            stockWindow.webContents.send('update-newproduct-list');
        }
        
    });


    ipcMain.handle('get-newproduct-tolist', async () => {
        const newProduct = await storeProducts.getProduct(productPivot.id);
        delete productPivot;
        return newProduct;
    });

    ipcMain.handle('check-product-existance', async (e, id) => {
        const check = await storeProducts.checkExistance(id);

        return check;
    });

    let idDeleted;
    ipcMain.on('delete-product', async (e, id) => {
        if(id){
            await storeProducts.deleteProduct(id);

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
    ipcMain.on('edit-product', async (e, {
        id,
        description,
        buyPrice,
        wholesalerPrice,
        unitPrice,
        stock,
        stockMin,
        departmentId,
        locationShowId,
        locationStoreId,
        unitMeasureId,
    }) => {

        if(id && description && buyPrice && wholesalerPrice && unitPrice && stock && stockMin && departmentId && locationShowId && locationStoreId && unitMeasureId) {
            const editedProduct = await storeProducts.editProduct({
                id,
                description,
                buyPrice,
                wholesalerPrice,
                unitPrice,
                stock,
                stockMin,
                departmentId,
                locationShowId,
                locationStoreId,
                unitMeasureId,
            });
            const editedProductFull = await storeProducts.getProduct(editedProduct.id);
            const stockWindow = returnStockWindow();
            const editProductWindow = returnEditProductWindow();

            editProductWindow.webContents.send('confirm-product-edit');
            stockWindow.webContents.send('update-products-list-byedit');

            modified = editedProductFull;
        }

        ipcMain.handle('get-modified-id', () => {
            const editedProduct = modified;
            delete modified;
            return editedProduct; 
        });
    });

    ipcMain.on('load-missing-stock-window', async () => {
        const missing = await storeProducts.getProductsMissing();
        createMissingStockWindow({missing});
    });
};