const { app, BrowserWindow, Tray, Menu, session } = require('electron');

const handleErrors = require('./handleErrors');
const handlebarsHbs = require('esanti-electron-hbs');
const path = require('path');
const storeProducts = require('./components/products/store');
const storeCustomers = require('./components/customers/store');

// Declaratios of windows
let mainWindow, loginWindow, settingsWindow, sellsHistoryWindow, paymentWindow, searchProductsWindow, customerListWindow, ordersWindow, suppliersWindow, suppliersEditWindow, suppliersAddWindow;
let tray;

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

function createTray () {
    tray = new Tray('./renderer/images/logo-tray.png');
  
    const contextMenu = Menu.buildFromTemplate([
      { role: 'quit' },
    ]);
    tray.setToolTip('Mercado 1990');
    tray.setContextMenu(contextMenu);
    tray.on('click', () => {
      if( mainWindow != null && mainWindow != undefined ) {
  
          mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
      } else if( loginWindow != null && loginWindow != undefined ) {
          loginWindow.isVisible() ? loginWindow.hide() : loginWindow.show();
      }
    })
  }
 
function createLoginWindow () {
  createTray();
  loginWindow = new BrowserWindow({
    icon: `${__dirname}/renderer/images/favicon.png`,
    width: 800, height: 600,
    title: 'Mercado 1990 | Login',
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
  createTray();
    mainWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
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


function createPaymentWindow ({
  totalAmount,
  articlesQuantity
}) {
    paymentWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 800, height: 600,
      title: 'Mercado 1990 | Metodos de pago',
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
    paymentWindow.loadFile(historyHandlebars.render(`sells/payment.hbs`, { totalAmount, articlesQuantity }));
    
    handleErrors(paymentWindow);
    
    // Listen for window being closed
    paymentWindow.on('closed',  () => {
    paymentWindow = null;
    });
    
  }


  function createSettingsWindow () {
    settingsWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 800, height: 600,
      title: 'Mercado 1990 | Configuraciones',
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
    const actualDate = new Date();
    const date = `${actualDate.getDate()}/${actualDate.getMonth()+1}/${actualDate.getFullYear()}`;
  
    sellsHistoryWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 1200, height: 700,
      title: `Mercado 1990-Historial de Ventas-${date}`,
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

  function createSearchProductsWindow () {
    searchProductsWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 800, height: 700,
      title: `Mercado 1990 - Buscar Productos`,
      backgroundColor: 'F7F7F7',
      webPreferences: { 
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: mainWindow,
      modal: true,
    });

    const products = storeProducts.getAllProducts();
  
    searchProductsWindow.loadFile(historyHandlebars.render('/sells/searchProducts.hbs', { products }));
    
    handleErrors(searchProductsWindow);
    
    // Listen for window being closed
    searchProductsWindow.on('closed',  () => {
      searchProductsWindow = null;
    });
    
  };

  function createCustomerListWindow ({
    totalAmount,
  }) {
    customerListWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 800, height: 700,
      title: `Mercado 1990 - Lista de Clientes`,
      backgroundColor: 'F7F7F7',
      webPreferences: { 
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: paymentWindow,
      modal: true,
    });

    const customers = storeCustomers.getAllCustomers();
  
    customerListWindow.loadFile(historyHandlebars.render('/sells/customerList.hbs', { customers, totalAmount }));
    
    handleErrors(customerListWindow);
    
    // Listen for window being closed
    customerListWindow.on('closed',  () => {
      customerListWindow = null;
    });
    
  };

  function createOrdersWindow({
    orders,
  }) {
    ordersWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 1200, height: 700,
      title: `Mercado 1990- Pedidos`,
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
    ordersWindow.loadFile(historyHandlebars.render('/sells/orders.hbs', {orders}));
    
    handleErrors(ordersWindow);
    
    // Listen for window being closed
    ordersWindow.on('closed',  () => {
      ordersWindow = null;
    });
  };

  function createSuppliersWindow({
    suppliers,
  }) {
    suppliersWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 1200, height: 700,
      title: `Mercado 1990- Proveedores`,
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
    suppliersWindow.loadFile(historyHandlebars.render('/buys/suppliers.hbs', {suppliers}));
    
    handleErrors(suppliersWindow);
    
    // Listen for window being closed
    suppliersWindow.on('closed',  () => {
      suppliersWindow = null;
    });
  };

  function createSuppliersEditWindow({ supplier}) {
    suppliersEditWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 700, height: 1000,
      title: `Mercado 1990- Proveedores- Editar/Eliminar`,
      backgroundColor: 'F7F7F7',
      webPreferences: { 
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: suppliersWindow,
      modal: true,
    });
    
    // Load index.hbs into the new BrowserWindow
    suppliersEditWindow.loadFile(historyHandlebars.render('/buys/suppliersEdit.hbs', {supplier}));
    
    handleErrors(suppliersEditWindow);
    
    // Listen for window being closed
    suppliersEditWindow.on('closed',  () => {
      suppliersEditWindow = null;
    });
  };

  function createSuppliersAddWindow() {
    suppliersAddWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 700, height: 1000,
      title: `Mercado 1990- Proveedores- Agregar`,
      backgroundColor: 'F7F7F7',
      webPreferences: { 
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: suppliersWindow,
      modal: true,
    });
    
    // Load index.hbs into the new BrowserWindow
    suppliersAddWindow.loadFile(historyHandlebars.render('/buys/suppliersAdd.hbs'));
    
    handleErrors(suppliersAddWindow);
    
    // Listen for window being closed
    suppliersAddWindow.on('closed',  () => {
      suppliersAddWindow = null;
    });
  };


  function returnMainWindow () {
    return mainWindow;
  };
  
  function returnLoginWindow () {
    return loginWindow;
  };
  
  function returnSettingsWindow () {
    return settingsWindow;
  };
  
  function returnSellsHistoryWindow () {
    return sellsHistoryWindow;
  };
  
  function returnPaymentWindow () {
    return paymentWindow;
  };

  function returnSearchProductsWindow () {
    return searchProductsWindow;
  };

  function returnCustomerListWindow () {
    return customerListWindow;
  };

  function returnOrdersWindow () {
    return ordersWindow;
  };

  function returnSuppliersWindow () {
    return suppliersWindow;
  };

  function returnSuppliersEditWindow (){
    return suppliersEditWindow;
  };
  
  function returnSuppliersAddWindow (){
    return suppliersAddWindow;
  };

module.exports = {
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
    returnMainWindow,
    returnLoginWindow,
    returnSettingsWindow,
    returnSellsHistoryWindow,
    returnPaymentWindow,
    returnSearchProductsWindow,
    returnCustomerListWindow,
    returnOrdersWindow,
    returnSuppliersWindow,
    returnSuppliersEditWindow,
    returnSuppliersAddWindow,
    mainHandlebars,
    historyHandlebars,
};