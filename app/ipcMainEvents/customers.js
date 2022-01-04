const { ipcMain, dialog } = require('electron');

const storeCustomers = require('../components/customers/store');
const storeDirections = require('../components/directions/store');
const storeDocTypes = require('../components/docTypes/store');

const { mainHandlebars,
        historyHandlebars,
        returnCustomersWindow,
        returnAddCustomerWindow,
        returnEditCustomerWindow,
        returnDeleteCustomerWindow,
} = require('../createWindows');

module.exports = ({
    createCustomersWindow,
    createAddCustomerWindow,
    createEditCustomerWindow,
    createDeleteCustomerWindow,
}) => {

    ipcMain.on('load-customers-window', () => {
        const customers = storeCustomers.getAllCustomers();
        if(customers){
            createCustomersWindow({customers});
        };
    });

    ipcMain.on('load-addcustomer-window', () => {
        const freeCode = storeCustomers.getFreeFirstIndex();
        const provinces = storeDirections.getAllProvinces();
        const docTypes = storeDocTypes.getAllDocTypes();
        const object = JSON.parse(provinces);
        createAddCustomerWindow({provinces: object.provincias, docTypes, freeCode});
    });

    ipcMain.on('load-editcustomer-window', () => {
        const provinces = storeDirections.getAllProvinces();
        const docTypes = storeDocTypes.getAllDocTypes();
        const object = JSON.parse(provinces);
        createEditCustomerWindow({provinces: object.provincias, docTypes});
    });

    ipcMain.on('load-deletecustomer-window', () => {
        createDeleteCustomerWindow();
    });

    ipcMain.handle('get-departments-byprovince', (e, idProvince) => {
        const departmentsByProv = storeDirections.getDepartmentsByProvince(idProvince);

        return departmentsByProv;
    });

    ipcMain.handle('get-cities-bydepartment', (e, idDepartment) => {
        const citiesByDepartment = storeDirections.getCitiesByDepartment(idDepartment);

        return citiesByDepartment;
    });

    ipcMain.handle('check-customer-existance', (e, id) => {
        const check = storeCustomers.checkExistance(id);

        return check;
    });

    let addedPivot;
    ipcMain.on('add-customer', (e, {
        id,
        name,
        docType,
        numDoc,
        cuit,
        email,
        phoneNumber,
        province,
        department,
        postCode,
        city,
        street,
        initialDebt,
    }) => {
        if(
            id,
            name,
            docType,
            numDoc,
            cuit,
            email,
            phoneNumber,
            province,
            department,
            postCode,
            city,
            street,
            initialDebt
        ){

            const dirProv = storeDirections.getProvince(province);
            const dirDepto = storeDirections.getDepartment(department);
            const dirCity = storeDirections.getCity(city);
            const typeDoc = storeDocTypes.getDocType(docType);


            const added = storeCustomers.addCustomer({
                id, 
                name,
                docType: typeDoc,
                numDoc,
                cuit,
                email,
                phoneNumber,
                dirProv,
                dirDepto,
                postCode,
                dirCity,
                street,
                initialDebt,
            });

            const customersWindow = returnCustomersWindow();
            customersWindow.webContents.send('update-customer-list-fromadd');

            addedPivot = added;
        };
    });

    ipcMain.handle('get-added-customer-update', () => {
        const added = addedPivot;
        delete addedPivot;

        const addCustomerWindow = returnAddCustomerWindow();

        addCustomerWindow.webContents.send('confirm-added-customer');

        return added; 
    });

    let pivotEdited;
    ipcMain.on('edit-customer', (e, {
        id,
        name,
        docType,
        numDoc,
        cuit,
        email,
        phoneNumber,
        province,
        department,
        postCode,
        city,
        street,
        debts,
    }) => {
        if(id && name && docType && numDoc && cuit && email && phoneNumber && province && department && postCode && city && street && debts){
            const dirProv = storeDirections.getProvince(province);
            const dirDepto = storeDirections.getDepartment(department);
            const dirCity = storeDirections.getCity(city);
            const typeDoc = storeDocTypes.getDocType(docType);

            const editedCustomer = storeCustomers.editCustomer({
                id,
                name,
                docType: typeDoc,
                numDoc,
                cuit,
                email,
                phoneNumber, 
                dirProv,
                dirDepto,
                dirPostCode: postCode,
                dirCity,
                dirStreet: street,
                debts,
            });

            pivotEdited = editedCustomer;

            const customersWindow = returnCustomersWindow();

            customersWindow.webContents.send('update-customer-list-fromedit');
        };
    });

    ipcMain.handle('get-edited-customer', () => {
        const edited = pivotEdited;
        delete pivotEdited;

        const editCustomerWindow = returnEditCustomerWindow();
        editCustomerWindow.webContents.send('confirm-edited-customer')

        return edited;
    });

    ipcMain.handle('get-customer', (e, id) => {
        const customer = storeCustomers.getCustomer(id);
        if (customer) {
            return customer;
        };
    });

    let deletedPivot;
    ipcMain.on('delete-customer', (e, id) => {
        const deleteCustomerWindow = returnDeleteCustomerWindow();
        const customer = storeCustomers.getCustomer(id);
        const response = dialog.showMessageBoxSync(deleteCustomerWindow, {
            title: `Eliminar Cliente N${customer.id}, ${customer.name}`,
            message: 'Seguro que desea eliminar permanentemente este cliente?',
            type: 'question',
            buttons: ['Cancelar', 'Confirmar'],
        });

        if(response == 1){
            if(id){
                storeCustomers.deleteCustomer(id);
            };
    
            deletedPivot = id;
    
            const customersWindow = returnCustomersWindow();
            customersWindow.webContents.send('update-customers-list-bydelete');
        };
    });

    ipcMain.handle('get-idcustomer-deleted', () => {
        const id = deletedPivot;
        delete deletedPivot;

        const deleteCustomerWindow = returnDeleteCustomerWindow();
        deleteCustomerWindow.webContents.send('confirm-customer-delete');

        return id;
    });

    

};