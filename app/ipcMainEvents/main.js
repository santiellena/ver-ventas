const { ipcMain, dialog } = require('electron');

const { mainHandlebars,
        historyHandlebars,
        returnMainWindow,
        returnLoginWindow,
        returnSettingsWindow,
        
} = require('../createWindows');

module.exports = ({
    createMainWindow,
    createLoginWindow,
    createSettingsWindow,
}) => {
     ipcMain.on('load-page-main', (e, pageName) => {
        const mainWindow = returnMainWindow()
        if( mainWindow != null && mainWindow != undefined ) {
            mainWindow.loadFile(mainHandlebars.render(pageName));
        } else {
            console.log('Is still undefinded');
        }
        
    });

    ipcMain.on('logout', (e, args) => {
        createLoginWindow();
    });

    ipcMain.on('fullscreen-mainwindow', (e, args) => {

    });

    ipcMain.on('load-settings', (e, args) => {
        createSettingsWindow();
     });
}