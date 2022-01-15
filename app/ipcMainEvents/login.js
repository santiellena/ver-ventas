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
  checkToken,
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
          if(infoData){
            return infoData;
          } else {
            return null;
          };
        };
      });

      ipcMain.handle('join-branch', (e, {token, idBranch}) => {
        if(idBranch && token){
          const response = checkToken(token, idBranch);

          if(response) {
            const firstTimeWindow = returnFirstTimeWindow();
            createLoginWindow();
            firstTimeWindow.close();

            return 1;
          } else {
            return null;
          };
        };
      });
};