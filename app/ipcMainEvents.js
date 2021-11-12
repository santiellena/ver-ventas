const { ipcMain } = require('electron');

module.exports = ({
    createMainWindow,
    createLoginWindow,
    createSettingsWindow,
    createSellsHistoryWindow,
    returnMainWindow,
    returnLoginWindow,
    returnSettingsWindow,
    returnSellsGistoryWindow,
    mainHandlebars,
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
    
    ipcMain.on('open-sells-history', () => {
        createSellsHistoryWindow();
    });

}   