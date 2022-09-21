const { ipcMain, session } = require('electron');

const auth = require('../components/auth/store');

const { 
    returnFirstTimeWindow,
} = require('../createWindows');

const {
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
        const token = await auth.login(username, password);
        if(token.data.message){
          return null;
        };
        const cookie = { url: getUrl(), name: 'token', value: token.data };
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

      ipcMain.handle('check-url', async (e, url) => {
        if(url){
          const infoData = await checkUrl(url);
          if(infoData){
            return infoData;
          } else {
            return null;
          };
        };
      });

      ipcMain.handle('join-branch', async (e, {token, idBranch}) => {
        if(idBranch && token){
          const response = await checkToken(token, idBranch);
          console.log(response);
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
      const userData = await auth.getUserData(info[0].value);
      if(!userData){
        throw new Error('BAD LOGIN DATA');
      } else if(userData.data.message){
        return null;
      } else {
        userData.data.name = userData.data.emplooy.name;
        return userData.data;
      };
      
    });

};