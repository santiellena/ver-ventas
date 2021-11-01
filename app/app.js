'use strict'
// Modules
const { app, BrowserWindow, Tray, Menu, ipcMain } = require('electron');
const path = require('path');
const handlebarsHbs = require('esanti-electron-hbs');
const devTools = require('./devtools');
const ipcMainEvents = require('./ipcMainEvents');

// Declaratios of windows
let mainWindow, loginWindow;
let tray;

if(process.env.NODE_ENV == 'development'){
  devTools();
}

function createTray () {
  tray = new Tray('./renderer/images/user.png');

  const contextMenu = Menu.buildFromTemplate([
    { role: 'quit' },
  ]);
  tray.setToolTip('VerSystem');
  tray.setContextMenu(contextMenu);
  tray.on('click', () => {
    if( mainWindow != null && mainWindow != undefined ) {

        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    } else if( loginWindow != null && loginWindow != undefined ) {
        loginWindow.isVisible() ? loginWindow.hide() : loginWindow.show();
    }
  })
}
 
// initialization Custom handlebars
const newHandlebars = new handlebarsHbs(
    path.join(__dirname, '/renderer/html'),
    path.join(__dirname, '/renderer/html', 'layout'),
    'main.hbs',
    path.join(__dirname, '/renderer/html', 'temp'),
    path.join(__dirname, '/renderer/html', 'partials'),
    {
      navMenu: 'navMenu.hbs',
    },
);

function createLoginWindow () {
  createTray();
  loginWindow = new BrowserWindow({
    width: 800, height: 600,
    title: 'VerSystem',
    backgroundColor: 'F7F7F7',
    webPreferences: { 
      nodeIntegration: false,
      contextIsolation: true,
      preload: `${__dirname}/preload.js`,
    },
  });

  loginWindow.loadFile(`${__dirname}/renderer/html/login.html`);

  loginWindow.on('closed',  () => {
    loginWindow = null;
  });
}

// Create a new BrowserWindow when `app` is ready
function createMainWindow  () {
  mainWindow = new BrowserWindow({
    width: 2000, height: 1800,
    backgroundColor: '2A3F54',
    webPreferences: { 
      nodeIntegration: false,
      preload: `${__dirname}/preload.js`,
    }
  });
// Load index.hbs into the new BrowserWindow
mainWindow.loadFile(newHandlebars.render('/sells/index.hbs'));

 // Listen for window being closed
mainWindow.on('closed',  () => {
  mainWindow = null;
});

}
// Main window
app.on('ready', createLoginWindow);

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createMainWindow();
});
 
// removes all rendered files 
app.on("quit", () => {
    newHandlebars.clearTemps();
});

function returnMainWindow () {
  return mainWindow;
}

ipcMainEvents({
  createMainWindow,
  returnMainWindow,
  newHandlebars,
});