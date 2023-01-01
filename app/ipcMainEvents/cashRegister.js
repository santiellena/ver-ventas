const { ipcMain, dialog } = require('electron');

const storeCashFlow = require('../components/cashFlow/store');
const storeCashRegister = require('../components/cashRegister/store');
const config = require('../config/config');
const auth = require('../config/auth');

const {
        returnCashFlowInWindow,
        returnCashFlowOutWindow,
        
} = require('../createWindows');

module.exports = ({
    createCashFlowHistoryWindow,
    createCashFlowInWindow,
    createCashFlowOutWindow,
}) => {

    ipcMain.on('load-cashflowhistory-window', async () => {
        const cashFlow = await storeCashFlow.getLast10Registers(0);
        createCashFlowHistoryWindow({cashFlow});
    });

    ipcMain.handle('movements-history-change', async (e, state) => {
        return await storeCashFlow.getLast10Registers(state);
    });

    ipcMain.on('load-cashflowin-window', () => {
        createCashFlowInWindow();
    });

    ipcMain.on('load-cashflowout-window', () => {
        createCashFlowOutWindow();
    });

    ipcMain.on('add-cashflow-in', async (e, {amount, observation}) => {
        if(amount && observation) {
            const cashFlowInWindow = returnCashFlowInWindow();
            const box = config.getCashRegisterId();
            const emplooy = await auth.getUserSessionInfo();
            const branch = config.getBranchDataFromConfig();

            const response = dialog.showMessageBoxSync(cashFlowInWindow, {
                title: 'Confirmación de INGRESO de EFECTIVO',
                message: `Ingreso $ ${amount}, cargado por ${emplooy.name}.`,
                buttons: ['Confirmar', 'Cancelar'],
            });

            if(response == 0){
                let added, update;
                if(box && emplooy) {

                    added = await storeCashFlow.addRegister({
                        amount,
                        observation,
                        box,
                        operation: 'IN',
                        emplooy,
                    });
                    update = await storeCashRegister.addToBox(box, branch.id, amount);
                };
                if(added && update) {
                    cashFlowInWindow.webContents.send('confirm-cashflow-in');
                };
            } else {
                throw new Error('FALLO EN EL SERVIDOR, consultar por mantenimiento.');
            };
        };
    });

    ipcMain.on('add-cashflow-out', async (e, {amount, observation}) => {
        if(amount && observation) {
            const cashFlowOutWindow = returnCashFlowOutWindow();
            const box = config.getCashRegisterId();
            const emplooy = await auth.getUserSessionInfo();
            const branch = config.getBranchDataFromConfig();

            const response = dialog.showMessageBoxSync(cashFlowOutWindow, {
                title: 'Confirmación de EGRESO de EFECTIVO',
                message: `Egreso $ ${amount}, cargado por ${emplooy.name}.`,
                buttons: ['Confirmar', 'Cancelar'],
            });

            if(response == 0){
                let added, update;
                if(box && emplooy) {

                    added = await storeCashFlow.addRegister({
                        amount,
                        observation,
                        box,
                        operation: 'OUT',
                        emplooy,
                    });
                    update = await storeCashRegister.substractToBox(box, branch.id, amount);
                };
                if(added && update) {
                    cashFlowOutWindow.webContents.send('confirm-cashflow-out');
                };
            } else {
                throw new Error('FALLO EN EL SERVIDOR, consultar por mantenimiento.');
            };
        };
    });

    ipcMain.handle('get-limit-cashout-amount', async () => {
        const idBox = config.getCashRegisterId();
        const boxInfo = await storeCashRegister.returnBoxInfo(idBox);

        return boxInfo.moneyAmount;
    });

    ipcMain.handle('get-cash-cashRegister', async () => {
        const idBox = config.getCashRegisterId();
        const box = await storeCashRegister.returnBoxInfo(idBox);
        return box.moneyAmount;
    });

};