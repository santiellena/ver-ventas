const { ipcMain } = require('electron');

module.exports = ({
    createMainWindow,
    returnMainWindow,
    newHandlebars,
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

    ipcMain.on('load-index', (e, args) => {
        const mainWindow = returnMainWindow()
        if( mainWindow != null && mainWindow != undefined ) {
            mainWindow.loadFile(newHandlebars.render('index.hbs'));
        } else {
            console.log('Is still undefinded');
        }
        
    });
}   