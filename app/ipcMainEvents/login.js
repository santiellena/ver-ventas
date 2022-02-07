const { ipcMain, dialog, session } = require('electron');

const auth = require('../components/auth/store');

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
  getUrl,
} = require('../config/config');

module.exports = ({
    createMainWindow,
    createLoginWindow,
}) => {
  
    ipcMain.handle('login', async (e, args) => {
        const { username, password } = args;
        const token = auth.login(username, password);
        const cookie = { url: getUrl(), name: 'token', value: `${JSON.stringify(token)}` };
        if(token){
          const ses = session.defaultSession;
          const answer = ses.cookies.set(cookie).then(() => {
            createMainWindow();
            return 'success';
          }).catch(err => {
            console.log(err, 'No se pudo agregar la cookie, token de login');
            return 'internal';
          });
          
          return answer;
        } else {
          return token;
        };
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

      ipcMain.on('logout', (e, args) => {
        createLoginWindow();
    });

    ipcMain.handle('get-login-info', async () => {
      const ses = session.defaultSession;
      const info = await ses.cookies.get({url: getUrl(), name: 'token'});
      const valueToken = JSON.parse(info[0].value);
      return valueToken;
    });

};