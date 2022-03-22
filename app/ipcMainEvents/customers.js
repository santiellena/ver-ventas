const { ipcMain, dialog } = require('electron');

const storeCustomers = require('../components/customers/store');
const storeDirections = require('../components/directions/store');
const storeDocTypes = require('../components/docTypes/store');
const storeSells = require('../components/sells/store');
const storeDebtPayments = require('../components/debtPayments/store');

const auth = require('../config/auth');

const { mainHandlebars,
        historyHandlebars,
        returnCustomersWindow,
        returnAddCustomerWindow,
        returnEditCustomerWindow,
        returnDeleteCustomerWindow,
        returnPayDebtsWindow,
        returnListDebtsWindow,
} = require('../createWindows');

module.exports = ({
    createCustomersWindow,
    createAddCustomerWindow,
    createEditCustomerWindow,
    createDeleteCustomerWindow,
    createPayDebtsWindow,
    createListDebtsWindow,
}) => {

    ipcMain.on('load-customers-window', () => {
        const customers = storeCustomers.getAllCustomers();
        if(customers){
            createCustomersWindow({customers});
        };
    });

    ipcMain.on('load-addcustomer-window', async () => {
        const freeCode = await storeCustomers.getFreeFirstIndex();
        const provinces = storeDirections.getAllProvinces();
        const docTypes = await storeDocTypes.getAllDocTypes();
        const object = JSON.parse(provinces);
        createAddCustomerWindow({provinces: object.provincias, docTypes, freeCode});
    });

    ipcMain.on('load-editcustomer-window', async () => {
        const provinces = storeDirections.getAllProvinces();
        const docTypes = await storeDocTypes.getAllDocTypes();
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

    ipcMain.handle('check-customer-existance', async (e, id) => {
        const check = await storeCustomers.checkExistance(id);

        return check;
    });

    let addedPivot;
    ipcMain.on('add-customer', async (e, {
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


            const added = await storeCustomers.addCustomer({
                id, 
                name,
                docType,
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
    ipcMain.on('edit-customer', async (e, {
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

            const editedCustomer = storeCustomers.editCustomer({
                id,
                name,
                docType,
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

    ipcMain.handle('get-customer', async (e, id) => {
        const customer = await storeCustomers.getCustomer(id);
        if (customer) {
            return customer;
        };
    });

    let deletedPivot;
    ipcMain.on('delete-customer', async (e, id) => {
        const deleteCustomerWindow = returnDeleteCustomerWindow();
        const customer = await storeCustomers.getCustomer(id);
        const response = dialog.showMessageBoxSync(deleteCustomerWindow, {
            title: `Eliminar Cliente N${customer.id}, ${customer.name}`,
            message: 'Seguro que desea eliminar permanentemente este cliente?',
            type: 'question',
            buttons: ['Cancelar', 'Confirmar'],
        });

        if(response == 1){
            if(id){
                await storeCustomers.deleteCustomer(id);
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

    ipcMain.on('load-listdebts-window', () => {
        createListDebtsWindow();
    });

    ipcMain.on('load-paydebts-window', (e, idCustomer) => {
        if(idCustomer){
            createPayDebtsWindow({idCustomer});
        };
    });

    ipcMain.handle('get-sells-by-customer', async (e, idCustomer) => {
        if(idCustomer){
            const sellsByCustomer = await storeSells.getSellsByCustomer(idCustomer);

            if(sellsByCustomer){
                return sellsByCustomer;
            };
        };
    });

    ipcMain.handle('get-payments-by-customer', async (e, idCustomer) => {
        if(idCustomer){
            const debtPaymentsByCustomer = await storeDebtPayments.getPaymentsByCustomer(idCustomer);

            if(debtPaymentsByCustomer){

                return debtPaymentsByCustomer;
            };
        };
    });

    ipcMain.on('payDebt-cash', async (e, {amount, idCustomer, observation}) => {
        if(amount && idCustomer && observation){
            const payDebtsWindow = returnPayDebtsWindow();
            const customer = await storeCustomers.getCustomer(idCustomer);

            const answer = dialog.showMessageBoxSync(payDebtsWindow, {
                title: `Pago Deuda en EFECTIVO`,
                message: `Monto: $${amount}, Cliente: N${customer.id} ${customer.name}`,
                buttons: ['Cancelar', 'Confirmar'],
            });

            if(answer == 1){
                const emplooy = await auth.getUserSessionInfo();

                const payment = await storeDebtPayments.addPay({
                    amount,
                    observation,
                    customer: customer.id,
                    emplooy: emplooy.idEmplooy,
                    howPaid: 'Contado',
                });

                if(payment) {
                    const listDebtsWindow = returnListDebtsWindow();
                    listDebtsWindow.webContents.send('load-new-payment');
                    await storeCustomers.removeFromDebts(idCustomer, amount);
                    payDebtsWindow.close();
                };
            };
        };
    });

    ipcMain.on('payDebt-card', async (e, {amount, idCustomer, observation}) => {
        if(amount && idCustomer && observation){
            const payDebtsWindow = returnPayDebtsWindow();
            const customer = await storeCustomers.getCustomer(idCustomer);

            const answer = dialog.showMessageBoxSync(payDebtsWindow, {
                title: `Pago Deuda con TARJETA`,
                message: `Monto: $${amount}, Cliente: N${customer.id} ${customer.name}.
                Oprima "Confirmar" si la tarjeta fue aceptada.`,
                buttons: ['Cancelar', 'Confirmar'],
                type: 'question',
            });

            if(answer == 1){
                const emplooy = await auth.getUserSessionInfo();

                const payment = await storeDebtPayments.addPay({
                    amount,
                    observation,
                    customer: customer.id,
                    emplooy: emplooy.idEmplooy,
                    howPaid: 'Tarjeta',
                });

                if(payment) {
                    const listDebtsWindow = returnListDebtsWindow();
                    listDebtsWindow.webContents.send('load-new-payment');
                    await storeCustomers.removeFromDebts(idCustomer, amount);
                    payDebtsWindow.close();
                };
            };
        };
    });

    ipcMain.on('payDebt-transference', async (e, {amount, idCustomer, observation}) => {
        if(amount && idCustomer && observation){
            const payDebtsWindow = returnPayDebtsWindow();
            const customer = await storeCustomers.getCustomer(idCustomer);

            const answer = dialog.showMessageBoxSync(payDebtsWindow, {
                title: `Pago Deuda con TARJETA`,
                message: `Monto: $${amount}, Cliente: N${customer.id} ${customer.name}.
                Oprima "Confirmar" si el comprobante de la transferencia es válido.`,
                buttons: ['Cancelar', 'Confirmar'],
                type: 'question',
            });

            if(answer == 1){
                const emplooy = await auth.getUserSessionInfo();

                const payment = await storeDebtPayments.addPay({
                    amount,
                    observation,
                    customer: customer.id,
                    emplooy: emplooy.idEmplooy,
                    howPaid: 'Transferencia Bancaria',
                });

                if(payment) {
                    const listDebtsWindow = returnListDebtsWindow();
                    listDebtsWindow.webContents.send('load-new-payment');
                    await storeCustomers.removeFromDebts(idCustomer, amount);
                    payDebtsWindow.close();
                };
            };
        };
    });

};