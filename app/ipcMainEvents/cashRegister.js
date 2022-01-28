const { ipcMain, dialog } = require('electron');

const storeCashFlow = require('../components/cashFlow/store');
const storeCashRegister = require('../components/cashRegister/store');
const config = require('../config/config');

const { mainHandlebars,
        historyHandlebars,
        returnMainWindow,
        returnCashFlowHistoryWindow,
        returnCashFlowInWindow,
        returnCashFlowOutWindow,
        
} = require('../createWindows');

module.exports = ({
    createCashFlowHistoryWindow,
    createCashFlowInWindow,
    createCashFlowOutWindow,
}) => {

    ipcMain.on('load-cashflowhistory-window', () => {
        const cashFlow = storeCashFlow.getAllRegisters();
        createCashFlowHistoryWindow({cashFlow});
    });

    ipcMain.on('load-cashflowin-window', () => {
        createCashFlowInWindow();
    });

    ipcMain.on('load-cashflowout-window', () => {
        createCashFlowOutWindow();
    });

    ipcMain.on('add-cashflow-in', (e, {amount, observation}) => {
        if(amount && observation) {
            const cashFlowInWindow = returnCashFlowInWindow();
            const box = config.getCashRegisterId();
            const emplooy = { id: 1, name: 'Administrador' };
            const branch = config.getBranchDataFromConfig();

            const response = dialog.showMessageBoxSync(cashFlowInWindow, {
                title: 'Confirmación de INGRESO de EFECTIVO',
                message: `Ingreso $ ${amount}, cargado por ${emplooy.name}.`,
                buttons: ['Confirmar', 'Cancelar'],
            });

            if(response == 0){
                let added, update;
                if(box && emplooy) {

                    added = storeCashFlow.addRegister({
                        amount,
                        observation,
                        box,
                        operation: 'IN',
                        emplooy,
                    });
                    update = storeCashRegister.addToBox(box, branch.id, amount);
                };
                if(added && update) {
                    cashFlowInWindow.webContents.send('confirm-cashflow-in');
                };
            } else {
                throw new Error('FALLO EN EL SERVIDOR, consultar por mantenimiento.');
            };
        };
    });

    ipcMain.on('add-cashflow-out', (e, {amount, observation}) => {
        if(amount && observation) {
            const cashFlowOutWindow = returnCashFlowOutWindow();
            const box = config.getCashRegisterId();
            const emplooy = { id: 1, name: 'Administrador' };
            const branch = config.getBranchDataFromConfig();

            const response = dialog.showMessageBoxSync(cashFlowOutWindow, {
                title: 'Confirmación de EGRESO de EFECTIVO',
                message: `Egreso $ ${amount}, cargado por ${emplooy.name}.`,
                buttons: ['Confirmar', 'Cancelar'],
            });

            if(response == 0){
                let added, update;
                if(box && emplooy) {

                    added = storeCashFlow.addRegister({
                        amount,
                        observation,
                        box,
                        operation: 'OUT',
                        emplooy,
                    });
                    update = storeCashRegister.substractToBox(box, branch.id, amount);
                };
                if(added && update) {
                    cashFlowOutWindow.webContents.send('confirm-cashflow-out');
                };
            } else {
                throw new Error('FALLO EN EL SERVIDOR, consultar por mantenimiento.');
            };
        };
    });

    ipcMain.handle('get-limit-cashout-amount', () => {
        const idBox = config.getCashRegisterId();
        const boxInfo = storeCashRegister.returnBoxInfo(idBox);

        return boxInfo.moneyAmount;
    });

    ipcMain.handle('get-cash-cashRegister', () => {
        const idBox = config.getCashRegisterId();
        const box = storeCashRegister.returnBoxInfo(idBox);
        return box.moneyAmount;
    });

};