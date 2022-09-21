const { ipcMain, dialog } = require('electron');

const storeCustomers = require('../components/customers/store');
const storeDirections = require('../components/directions/store');
const storeDocTypes = require('../components/docTypes/store');
const storeSells = require('../components/sells/store');
const storeDebtPayments = require('../components/debtPayments/store');
const storeCashRegister = require('../components/cashRegister/store');

const config = require('../config/config');
const auth = require('../config/auth');

const {
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

    ipcMain.on('load-customers-window', async () => {
        const customers = await storeCustomers.getAllCustomers();
        if(customers){
            createCustomersWindow({customers});
        };
    });

    ipcMain.on('load-addcustomer-window', async () => {
        const provinces = storeDirections.getAllProvinces();
        const docTypes = await storeDocTypes.getAllDocTypes();
        const object = JSON.parse(provinces);
        createAddCustomerWindow({provinces: object.provincias, docTypes});
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
        name,
        idDocType,
        numDoc,
        cuit,
        email,
        phoneNumber,
        idDirProvince,
        idDirDepartment,
        dirPostCode,
        idDirCity,
        dirStreet,
        initialDebt,
    }) => {
        if(
            name,
            idDocType,
            numDoc,
            cuit,
            email,
            phoneNumber,
            idDirProvince,
            idDirDepartment,
            dirPostCode,
            idDirCity,
            dirStreet,
            initialDebt
        ){
            const added = await storeCustomers.addCustomer({
                name,
                idDocType,
                numDoc,
                cuit,
                email,
                phoneNumber,
                idDirProvince,
                idDirDepartment,
                dirPostCode,
                idDirCity,
                dirStreet,
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
        idDocType,
        numDoc,
        cuit,
        email,
        phoneNumber,
        idDirProvince,
        idDirDepartment,
        dirPostCode,
        idDirCity,
        dirStreet,
        debt
    }) => {
        if(id && name && idDocType && numDoc && cuit && email && phoneNumber && idDirProvince && idDirDepartment && dirPostCode && idDirCity && dirStreet && debt){

            const editedCustomer = await storeCustomers.editCustomer({
                id,
                name,
                idDocType,
                numDoc,
                cuit,
                email,
                phoneNumber,
                idDirProvince,
                idDirDepartment,
                dirPostCode,
                idDirCity,
                dirStreet,
                debt
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
            } else return [];
        } else return [];
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
                const user = await auth.getUserSessionInfo();

                const payment = await storeDebtPayments.addPay({
                    amount,
                    observation,
                    idCustomer: customer.id,
                    idUser: user.id,
                    howPaid: 'Efectivo',
                });

                if(payment) {
                    const listDebtsWindow = returnListDebtsWindow();
                    listDebtsWindow.webContents.send('load-new-payment');
                    await storeCustomers.removeFromDebts(idCustomer, amount);
                    const branch = config.getBranchDataFromConfig();
                    await storeCashRegister.addToBox(config.getCashRegisterId(), branch.id, amount);
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
                const user = await auth.getUserSessionInfo();

                const payment = await storeDebtPayments.addPay({
                    amount,
                    observation,
                    idCustomer: customer.id,
                    idUser: user.id,
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
                title: `Pago Deuda con TRASNFERENCIA`,
                message: `Monto: $${amount}, Cliente: N${customer.id} ${customer.name}.
                Oprima "Confirmar" si el comprobante de la transferencia es válido.`,
                buttons: ['Cancelar', 'Confirmar'],
                type: 'question',
            });

            if(answer == 1){
                const user = await auth.getUserSessionInfo();

                const payment = await storeDebtPayments.addPay({
                    amount,
                    observation,
                    idCustomer: customer.id,
                    idUser: user.id,
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