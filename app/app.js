'use strict'
// Modules
const { app, BrowserWindow, Tray, Menu, ipcMain } = require('electron');
const path = require('path');
const handlebarsHbs = require('esanti-electron-hbs');
const devTools = require('./devtools');
const ipcMainEvents = require('./ipcMainEvents');
const handleErrors = require('./handleErrors');

// Declaratios of windows
let mainWindow, loginWindow, settingsWindow, sellsHistoryWindow, paymentWindow;
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
const mainHandlebars = new handlebarsHbs(
    path.join(__dirname, '/renderer/html'),
    path.join(__dirname, '/renderer/html', 'layout'),
    'main.hbs',
    path.join(__dirname, '/renderer/html', 'temp'),
    path.join(__dirname, '/renderer/html', 'partials'),
    {
      navMenu: 'navMenu.hbs',
      footer: 'footer.hbs'
    },
);

const historyHandlebars = new handlebarsHbs(
  path.join(__dirname, '/renderer/html'),
  path.join(__dirname, '/renderer/html', 'layout'),
  'historyPreset.hbs',
  path.join(__dirname, '/renderer/html', 'temp'),
  path.join(__dirname, '/renderer/html', 'partials'),
  {
  },
);

function createLoginWindow () {
  createTray();
  loginWindow = new BrowserWindow({
    width: 800, height: 600,
    title: 'VerSystem | Login',
    backgroundColor: 'F7F7F7',
    webPreferences: { 
      nodeIntegration: false,
      contextIsolation: true,
      preload: `${__dirname}/preload.js`,
    },
  });

  loginWindow.loadFile(`${__dirname}/renderer/html/login.html`);

  handleErrors(loginWindow);

  loginWindow.on('closed',  () => {
    loginWindow = null;
  });
}

// Create a new BrowserWindow when `app` is ready
function createMainWindow  () {
  mainWindow = new BrowserWindow({
    width: 3000, height: 2800,
    backgroundColor: '2A3F54',
    webPreferences: { 
      nodeIntegration: false,
      preload: `${__dirname}/preload.js`,
      contextIsolation: true,
    }
  });
// Load index.hbs into the new BrowserWindow
mainWindow.loadFile(mainHandlebars.render('/sells/index.hbs'));

handleErrors(mainWindow);

 // Listen for window being closed
mainWindow.on('closed',  () => {
  mainWindow = null;
});

}

function createPaymentWindow () {
  paymentWindow = new BrowserWindow({
    width: 800, height: 600,
    title: 'VerSystem | Metodos de pago',
    backgroundColor: 'F7F7F7',
    webPreferences: { 
      nodeIntegration: false,
      preload: `${__dirname}/preload.js`,
      contextIsolation: true,
    },
    parent: mainWindow,
    modal: true,
  });
  // Load index.hbs into the new BrowserWindow
  paymentWindow.loadFile(`${__dirname}/renderer/html/sells/payment.html`);
  
  handleErrors(paymentWindow);
  
  // Listen for window being closed
  paymentWindow.on('closed',  () => {
  paymentWindow = null;
  });
  
}

function createSettingsWindow () {
  settingsWindow = new BrowserWindow({
    width: 800, height: 600,
    title: 'VerSystem | Configuraciones',
    backgroundColor: 'F7F7F7',
    webPreferences: { 
      nodeIntegration: false,
      preload: `${__dirname}/preload.js`,
      contextIsolation: true,
    },
    parent: mainWindow,
    modal: true,
  });
  // Load index.hbs into the new BrowserWindow
  settingsWindow.loadFile(`${__dirname}/renderer/html/settings.html`);
  
  handleErrors(settingsWindow);
  
  // Listen for window being closed
  settingsWindow.on('closed',  () => {
  settingsWindow = null;
  });
  
}

function createSellsHistoryWindow () {
  console.log('AQUI')
  const actualDate = new Date();
  const date = `${actualDate.getDate()}/${actualDate.getMonth()+1}/${actualDate.getFullYear()}`;

  sellsHistoryWindow = new BrowserWindow({
    width: 1200, height: 700,
    title: `VerSystem-Historial de Ventas-${date}`,
    backgroundColor: 'F7F7F7',
    webPreferences: { 
      nodeIntegration: false,
      preload: `${__dirname}/preload.js`,
      contextIsolation: true,
    },
    parent: mainWindow,
    modal: true,
  });

  const sells = [
    {
      id: 33,
      date: Date.now().toString(),
      amount: '$2200',
      branch: 'Principal',
      customer: 'Consumidor final',
      howPaid: 'Contado',
    },
    {
      id: 22,
      date: Date.now().toString(),
      amount: '$1200',
      branch: 'Principal',
      customer: 'Baez Pedro',
      howPaid: 'Cuenta corriente',
    },
  ];
 
  // Load index.hbs into the new BrowserWindow
  sellsHistoryWindow.loadFile(historyHandlebars.render('/sells/history.hbs', {sells}));
  
  handleErrors(sellsHistoryWindow);
  
  // Listen for window being closed
  sellsHistoryWindow.on('closed',  () => {
    sellsHistoryWindow = null;
  });
  
}

// Login window
app.on('ready', createPaymentWindow);

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
    mainHandlebars.clearTemps();
});

function returnMainWindow () {
  return mainWindow;
}

function returnLoginWindow () {
  return loginWindow;
}

function returnSettingsWindow () {
  return settingsWindow;
}

function returnSellsHistoryWindow () {
  return sellsHistoryWindow;
}

function returnPaymentMethod () {
  return paymentWindow;
}

ipcMainEvents({
  createMainWindow,
  createLoginWindow,
  createSettingsWindow,
  createSellsHistoryWindow,
  createPaymentWindow,
  returnMainWindow,
  returnLoginWindow,
  returnSettingsWindow,
  returnSellsHistoryWindow,
  returnPaymentMethod,
  mainHandlebars,
  historyHandlebars,
});