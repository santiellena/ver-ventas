'use strict'
// Modules
const { app, ipcMain } = require('electron');
const devTools = require('./devtools');

const ipcMainEvents = {
  main: require('./ipcMainEvents/main'),
  sells: require('./ipcMainEvents/sells'),
  login: require('./ipcMainEvents/login'),
  buys: require('./ipcMainEvents/buys'),
  stock:  require('./ipcMainEvents/stock'),
  customers: require('./ipcMainEvents/customers'),
  cashRegister: require('./ipcMainEvents/cashRegister'),
}

const {
  createLoginWindow,
  createMainWindow, 
  createPaymentWindow,
  createSellsHistoryWindow,
  createSettingsWindow,
  createSearchProductsWindow,
  createCustomerListWindow,
  createOrdersWindow,
  createSuppliersWindow,
  createSuppliersEditWindow,
  createSuppliersAddWindow,
  createBuysWindow,
  createAddBuyWindow,
  createSearchProductsBuysWindow,
  createStockWindow,
  createAddProductWindow,
  createEditProductWindow,
  createDeleteProductWindow,
  createDepartmentsWindow,
  createCustomersWindow,
  createAddCustomerWindow,
  createEditCustomerWindow,
  createDeleteCustomerWindow,
  createPayDebtsWindow,
  createListDebtsWindow,
  createCashFlowHistoryWindow,
  createCashFlowInWindow,
  createCashFlowOutWindow,
} = require('./createWindows');

const { checkInitialConfig } = require('./config/config');

if(process.env.NODE_ENV == 'development'){
  devTools();
};

// Login window
//app.on('ready', checkInitialConfig); //Production
app.on('ready', createMainWindow);

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  ipcMain.removeAllListeners();
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

ipcMainEvents.main({
  createMainWindow,
  createLoginWindow,
  createSettingsWindow,
});

ipcMainEvents.sells({
  createSellsHistoryWindow,
  createPaymentWindow,
  createSearchProductsWindow,
  createCustomerListWindow,
  createOrdersWindow,
});

ipcMainEvents.login({
  createMainWindow,
  createLoginWindow,
});

ipcMainEvents.buys({
  createSuppliersWindow,
  createSuppliersEditWindow,
  createSuppliersAddWindow,
  createBuysWindow,
  createAddBuyWindow,
  createSearchProductsBuysWindow,
});

ipcMainEvents.stock({
  createStockWindow,
  createAddProductWindow,
  createEditProductWindow,
  createDeleteProductWindow,
  createDepartmentsWindow,
});

ipcMainEvents.customers({
  createCustomersWindow,
  createAddCustomerWindow,
  createEditCustomerWindow,
  createDeleteCustomerWindow,
  createPayDebtsWindow,
  createListDebtsWindow,
});

ipcMainEvents.cashRegister({
  createCashFlowHistoryWindow,
  createCashFlowInWindow,
  createCashFlowOutWindow,
});