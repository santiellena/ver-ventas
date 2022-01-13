const { ipcMain, dialog } = require('electron');

const { 
    mainHandlebars,
    historyHandlebars,
    returnMainWindow,
    returnLoginWindow,
    returnFirstTimeWindow,
} = require('../createWindows');

const {
  checkInitialConfig,
  checkUrl,
} = require('../config/config');

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

      ipcMain.handle('check-url', (e, url) => {
        if(url){
          const infoData = checkUrl(url);
          const firstTimeWindow = returnFirstTimeWindow();

          if(infoData){
            return infoData;
          } else {
            return null;
          };
        };
      });
};