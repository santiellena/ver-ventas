const { ipcMain, dialog, app } = require('electron');

const { mainHandlebars,
        historyHandlebars,
        returnMainWindow,
} = require('../createWindows');

module.exports = ({
}) => {

    ipcMain.on('dump-database', () => {
        const mainWindow = returnMainWindow();

        dialog.showSaveDialog(mainWindow, {
            title: 'Guardar Backup Localmente',
            buttonLabel: 'Backup',
            defaultPath: app.getPath('documents') + '/dump.sql',
        }).then((path) => {
            console.log(path);
        });
    });

};