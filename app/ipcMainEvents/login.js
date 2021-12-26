const { ipcMain, dialog } = require('electron');

const { 
    mainHandlebars,
    historyHandlebars,
    returnMainWindow,
    returnLoginWindow,
        
} = require('../createWindows');

module.exports = ({
    createMainWindow,
    createLoginWindow,
}) => {
    ipcMain.handle('login', (e, args) => {
        const { username, password } = args;
        if(username == 'admin' &&  password == 'admin'){ 
        
          createMainWindow();
          return true;
        } else {

          return false;
        }
      });
}