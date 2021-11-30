const { ipcMain, dialog } = require('electron');

const { mainHandlebars,
        historyHandlebars,
        returnMainWindow,
        returnLoginWindow,
        returnSettingsWindow,
        returnSellsHistoryWindow,
        returnPaymentWindow,
        
} = require('./createWindows');

module.exports = ({
    createMainWindow,
    createLoginWindow,
    createSettingsWindow,
    createSellsHistoryWindow,
    createPaymentWindow,
}) => {}