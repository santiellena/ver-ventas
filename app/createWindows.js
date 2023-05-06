const { app, BrowserWindow, Tray, Menu } = require("electron");

const handleErrors = require("./handleErrors");
const handlebarsHbs = require("esanti-electron-hbs");
const path = require("path");
const storeProducts = require("./components/products/store");
const storeCustomers = require("./components/customers/store");

// Declaratios of windows
let mainWindow,
  loginWindow,
  settingsWindow,
  sellsHistoryWindow,
  paymentWindow,
  searchProductsWindow,
  customerListWindow,
  ordersWindow,
  suppliersWindow,
  suppliersEditWindow,
  suppliersAddWindow,
  buysWindow,
  addBuyWindow,
  searchProductsBuysWindow,
  stockWindow,
  addProductWindow,
  editProductWindow,
  deleteProductWindow,
  departmentsWindow,
  customersWindow,
  addCustomerWindow,
  editCustomerWindow,
  deleteCustomerWindow,
  payDebtsWindow,
  listDebtsWindow,
  firstTimeWindow,
  cashFlowHistoryWindow,
  cashFlowInWindow,
  cashFlowOutWindow,
  generalMaintenanceWindow,
  branchesMaintenanceWindow,
  employeesWindow,
  addEmployeesWindow,
  editEmployeesWindow,
  usersWindow,
  addUserWindow,
  editUserWindow,
  unitsWindow,
  docsWindow,
  salesWindow,
  addSaleWindow,
  missingStockWindow,
  payOrdersWindow,
  locationsWindow;
let tray;

// initialization Custom handlebars
const mainHandlebars = new handlebarsHbs(
  path.join(__dirname, "/renderer/html"),
  path.join(__dirname, "/renderer/html", "layout"),
  "main.hbs",
  path.join(__dirname, "/renderer/html", "temp"),
  path.join(__dirname, "/renderer/html", "partials"),
  {
    navMenu: "navMenu.hbs",
    footer: "footer.hbs",
  }
);

const historyHandlebars = new handlebarsHbs(
  path.join(__dirname, "/renderer/html"),
  path.join(__dirname, "/renderer/html", "layout"),
  "historyPreset.hbs",
  path.join(__dirname, "/renderer/html", "temp"),
  path.join(__dirname, "/renderer/html", "partials"),
  {}
);

function createTray() {
  if (!tray) {
    tray = new Tray(`${__dirname}/renderer/images/favicon.png`);

    const contextMenu = Menu.buildFromTemplate([{ role: "quit" }]);
    tray.setToolTip("Mercado 1990");
    tray.setContextMenu(contextMenu);
    tray.on("click", () => {
      if (mainWindow != null && mainWindow != undefined) {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
      } else if (loginWindow != null && loginWindow != undefined) {
        loginWindow.isVisible() ? loginWindow.hide() : loginWindow.show();
      }
    });
  } else return null;
}

function createLoginWindow() {
  if (!loginWindow) {
    createTray();
    loginWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 800,
      height: 600,
      title: "Mercado 1990 | Login",
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: `${__dirname}/preload.js`,
      },
      resizable: false,
    });

    loginWindow.loadFile(`${__dirname}/renderer/html/login.html`);

    handleErrors(loginWindow);

    loginWindow.on("closed", () => {
      loginWindow.removeAllListeners();
      loginWindow = null;
    });
  } else return null;
}

// Create a new BrowserWindow when `app` is ready
function createMainWindow() {
  if (!mainWindow) {
    createTray();
    mainWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 3000,
      height: 2800,
      backgroundColor: "2A3F54",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      fullscreen: true,
      frame: false,
    });
    // Load index.hbs into the new BrowserWindow
    mainWindow.loadFile(mainHandlebars.render("/sells/index.hbs"), {});

    handleErrors(mainWindow);

    // Listen for window being closed
    mainWindow.on("closed", () => {
      mainWindow.removeAllListeners();
      mainWindow = null;
    });
  } else return null;
}

function createPaymentWindow({ totalAmount, articlesQuantity }) {
  if (!paymentWindow) {
    paymentWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 800,
      height: 600,
      title: "Mercado 1990 | Metodos de pago",
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: mainWindow,
      modal: true,
      resizable: false,
      frame: false,
    });
    // Load index.hbs into the new BrowserWindow
    paymentWindow.loadFile(
      historyHandlebars.render(`sells/payment.hbs`, {
        totalAmount,
        articlesQuantity,
      })
    );

    handleErrors(paymentWindow);

    // Listen for window being closed
    paymentWindow.on("closed", () => {
      paymentWindow.removeAllListeners();
      paymentWindow = null;
    });
  } else return null;
}

function createPayOrderWindow({
  totalAmount,
  articlesQuantity,
  priceList,
  idCustomer,
}) {
  if (!payOrdersWindow) {
    payOrdersWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 800,
      height: 600,
      title: "Mercado 1990 | Metodos de pago",
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: ordersWindow,
      modal: true,
      resizable: false,
      frame: false,
    });
    // Load index.hbs into the new BrowserWindow
    payOrdersWindow.loadFile(
      historyHandlebars.render(`sells/payOrders.hbs`, {
        totalAmount,
        articlesQuantity,
        priceList,
        idCustomer,
      })
    );

    handleErrors(payOrdersWindow);

    // Listen for window being closed
    payOrdersWindow.on("closed", () => {
      payOrdersWindow.removeAllListeners();
      payOrdersWindow = null;
    });
  } else return null;
}

function createSettingsWindow() {
  settingsWindow = new BrowserWindow({
    icon: `${__dirname}/renderer/images/favicon.png`,
    width: 800,
    height: 600,
    title: "Mercado 1990 | Configuraciones",
    backgroundColor: "F7F7F7",
    webPreferences: {
      nodeIntegration: false,
      preload: `${__dirname}/preload.js`,
      contextIsolation: true,
    },
    parent: mainWindow,
    modal: true,
    resizable: false,
    frame: false,
  });
  // Load index.hbs into the new BrowserWindow
  settingsWindow.loadFile(`${__dirname}/renderer/html/settings.html`);

  handleErrors(settingsWindow);

  // Listen for window being closed
  settingsWindow.on("closed", () => {
    settingsWindow.removeAllListeners();
    settingsWindow = null;
  });
}

function createSellsHistoryWindow({ sells }) {
  if (!sellsHistoryWindow) {
    const actualDate = new Date();
    const date = `${actualDate.getDate()}/${
      actualDate.getMonth() + 1
    }/${actualDate.getFullYear()}`;

    sellsHistoryWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 1300,
      height: 700,
      title: `Mercado 1990-Historial de Ventas-${date}`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      resizable: false,
      parent: mainWindow,
      modal: true,
      frame: false,
    });

    // Load index.hbs into the new BrowserWindow
    sellsHistoryWindow.loadFile(
      historyHandlebars.render("/sells/history.hbs", { sells })
    );

    handleErrors(sellsHistoryWindow);

    // Listen for window being closed
    sellsHistoryWindow.on("closed", () => {
      sellsHistoryWindow.removeAllListeners();
      sellsHistoryWindow = null;
    });
  } else return null;
}

function createSearchProductsWindow() {
  if (!searchProductsWindow) {
    searchProductsWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 1150,
      height: 700,
      title: `Mercado 1990 - Buscar Productos`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: mainWindow,
      modal: true,
      resizable: false,
      frame: false,
    });

    searchProductsWindow.loadFile(
      __dirname + "/renderer/html/sells/searchProducts.html"
    );

    handleErrors(searchProductsWindow);

    // Listen for window being closed
    searchProductsWindow.on("closed", () => {
      searchProductsWindow.removeAllListeners();
      searchProductsWindow = null;
    });
  } else return null;
}

function createCustomerListWindow({
  totalAmount,
  customers,
  totalAmountPlusDebt,
  howPaid,
  operation,
}) {
  if (!customerListWindow) {
    customerListWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 800,
      height: 700,
      title: `Mercado 1990 - Lista de Clientes`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: paymentWindow,
      modal: true,
      resizable: false,
      frame: false,
    });

    customerListWindow.loadFile(
      historyHandlebars.render("/sells/customerList.hbs", {
        customers,
        totalAmount,
        totalAmountPlusDebt,
        howPaid,
        operation,
      })
    );

    handleErrors(customerListWindow);

    // Listen for window being closed
    customerListWindow.on("closed", () => {
      customerListWindow.removeAllListeners();
      customerListWindow = null;
    });
  } else return null;
}

function createOrdersWindow({ orders }) {
  if (!ordersWindow) {
    ordersWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 1200,
      height: 700,
      title: `Mercado 1990- Pedidos`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: mainWindow,
      modal: true,
      resizable: false,
      frame: false,
    });

    // Load index.hbs into the new BrowserWindow
    ordersWindow.loadFile(
      historyHandlebars.render("/sells/orders.hbs", { orders })
    );

    handleErrors(ordersWindow);

    // Listen for window being closed
    ordersWindow.on("closed", () => {
      ordersWindow.removeAllListeners();
      ordersWindow = null;
    });
  } else return null;
}

function createSuppliersWindow({ suppliers }) {
  if (!suppliersWindow) {
    suppliersWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 1200,
      height: 700,
      title: `Mercado 1990- Proveedores`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: mainWindow,
      modal: true,
      resizable: false,
      frame: false,
    });

    // Load index.hbs into the new BrowserWindow
    suppliersWindow.loadFile(
      historyHandlebars.render("/buys/suppliers.hbs", { suppliers })
    );

    handleErrors(suppliersWindow);

    // Listen for window being closed
    suppliersWindow.on("closed", () => {
      suppliersWindow.removeAllListeners();
      suppliersWindow = null;
    });
  } else return null;
}

function createSuppliersEditWindow({ supplier, docTypes, provinces }) {
  if (!suppliersEditWindow) {
    suppliersEditWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 700,
      height: 1000,
      title: `Mercado 1990- Proveedores- Editar/Eliminar`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: suppliersWindow,
      modal: true,
      resizable: false,
      frame: false,
    });

    // Load index.hbs into the new BrowserWindow
    suppliersEditWindow.loadFile(
      historyHandlebars.render("/buys/suppliersEdit.hbs", {
        supplier,
        docTypes,
        provinces,
      })
    );

    handleErrors(suppliersEditWindow);

    // Listen for window being closed
    suppliersEditWindow.on("closed", () => {
      suppliersEditWindow.removeAllListeners();
      suppliersEditWindow = null;
    });
  } else return null;
}

function createSuppliersAddWindow({ docTypes, provinces }) {
  if (!suppliersAddWindow) {
    suppliersAddWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 700,
      height: 1000,
      title: `Mercado 1990- Proveedores- Agregar`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: suppliersWindow,
      modal: true,
      resizable: false,
      frame: false,
    });

    // Load index.hbs into the new BrowserWindow
    suppliersAddWindow.loadFile(
      historyHandlebars.render("/buys/suppliersAdd.hbs", {
        docTypes,
        provinces,
      })
    );

    handleErrors(suppliersAddWindow);

    // Listen for window being closed
    suppliersAddWindow.on("closed", () => {
      suppliersAddWindow.removeAllListeners();
      suppliersAddWindow = null;
    });
  } else return null;
}

function createBuysWindow({ buys }) {
  if (!buysWindow) {
    buysWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 1200,
      height: 700,
      title: `Mercado 1990- Compras`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: mainWindow,
      modal: true,
      resizable: false,
      frame: false,
    });

    // Load index.hbs into the new BrowserWindow
    buysWindow.loadFile(historyHandlebars.render("/buys/buys.hbs", { buys }));

    handleErrors(buysWindow);

    // Listen for window being closed
    buysWindow.on("closed", () => {
      buysWindow.removeAllListeners();
      buysWindow = null;
    });
  } else return null;
}

function createAddBuyWindow() {
  if (!addBuyWindow) {
    addBuyWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 1300,
      height: 1000,
      title: `Mercado 1990- Compras- Agregar Inventario`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: mainWindow,
      modal: true,
      resizable: false,
      frame: false,
    });

    // Load index.hbs into the new BrowserWindow
    addBuyWindow.loadFile(historyHandlebars.render("/buys/addBuy.hbs"));

    handleErrors(addBuyWindow);

    // Listen for window being closed
    addBuyWindow.on("closed", () => {
      addBuyWindow.removeAllListeners();
      addBuyWindow = null;
    });
  } else return null;
}

function createSearchProductsBuysWindow() {
  if (!searchProductsBuysWindow) {
    searchProductsBuysWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 800,
      height: 700,
      title: `Mercado 1990 - Buscar Productos`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: addBuyWindow,
      modal: true,
      resizable: false,
      frame: false,
    });

    const products = storeProducts.getAllProducts();

    searchProductsBuysWindow.loadFile(
      historyHandlebars.render("/buys/searchProducts.hbs", { products })
    );

    handleErrors(searchProductsBuysWindow);

    // Listen for window being closed
    searchProductsBuysWindow.on("closed", () => {
      searchProductsBuysWindow.removeAllListeners();
      searchProductsBuysWindow = null;
    });
  } else return null;
}

function createStockWindow({ products }) {
  if (!stockWindow) {
    const actualDate = new Date();
    const date = `${actualDate.getDate()}/${
      actualDate.getMonth() + 1
    }/${actualDate.getFullYear()}`;

    stockWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 1500,
      height: 1000,
      title: `Mercado 1990 - Stock - ${date}`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: mainWindow,
      frame: false,
      modal: true,
      resizable: false,
    });

    // Load index.hbs into the new BrowserWindow
    stockWindow.loadFile(
      historyHandlebars.render("/stock/products.hbs", { products })
    );

    handleErrors(stockWindow);

    // Listen for window being closed
    stockWindow.on("closed", () => {
      stockWindow.removeAllListeners();
      stockWindow = null;
    });
  } else return null;
}

function createAddProductWindow({
  departments,
  locationsShow,
  locationsStore,
  measures,
}) {
  if (!addProductWindow) {
    addProductWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 650,
      height: 705,
      resizable: false,
      title: `Mercado 1990 - Agregar Producto`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      frame: false,
      parent: stockWindow,
      modal: true,
      resizable: false,
    });

    // Load index.hbs into the new BrowserWindow
    addProductWindow.loadFile(
      historyHandlebars.render("/stock/addProduct.hbs", {
        departments,
        locationsShow,
        locationsStore,
        measures,
      })
    );

    handleErrors(addProductWindow);

    // Listen for window being closed
    addProductWindow.on("closed", () => {
      addProductWindow.removeAllListeners();
      addProductWindow = null;
    });
  } else return null;
}

function createEditProductWindow({
  departments,
  locationsShow,
  locationsStore,
  measures,
}) {
  if (!editProductWindow) {
    editProductWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 650,
      height: 705,
      title: `Mercado 1990 - Editar Producto`,
      backgroundColor: "F7F7F7",
      resizable: false,
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: stockWindow,
      frame: false,
      modal: true,
      resizable: false,
    });

    // Load index.hbs into the new BrowserWindow
    editProductWindow.loadFile(
      historyHandlebars.render("/stock/editProduct.hbs", {
        departments,
        locationsShow,
        locationsStore,
        measures,
      })
    );

    handleErrors(editProductWindow);

    // Listen for window being closed
    editProductWindow.on("closed", () => {
      editProductWindow.removeAllListeners();
      editProductWindow = null;
    });
  } else return null;
}

function createDeleteProductWindow() {
  if (!deleteProductWindow) {
    deleteProductWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 400,
      height: 358,
      title: `Mercado 1990 - Eliminar Producto`,
      backgroundColor: "F7F7F7",
      resizable: false,
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: stockWindow,
      modal: true,
      frame: false,
    });

    // Load index.hbs into the new BrowserWindow
    deleteProductWindow.loadFile(
      historyHandlebars.render("/stock/deleteProduct.hbs")
    );

    handleErrors(deleteProductWindow);

    // Listen for window being closed
    deleteProductWindow.on("closed", () => {
      deleteProductWindow.removeAllListeners();
      deleteProductWindow = null;
    });
  } else return null;
}

function createDepartmentsWindow({ departments }) {
  if (!departmentsWindow) {
    departmentsWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 1000,
      height: 600,
      title: `Mercado 1990 - Departamentos`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: stockWindow,
      modal: true,
      resizable: false,
      frame: false,
    });

    // Load index.hbs into the new BrowserWindow
    departmentsWindow.loadFile(
      historyHandlebars.render("/stock/departments.hbs", { departments })
    );

    handleErrors(departmentsWindow);

    // Listen for window being closed
    departmentsWindow.on("closed", () => {
      departmentsWindow.removeAllListeners();
      departmentsWindow = null;
    });
  } else return null;
}

function createLocationsWindow({ store, exposition }) {
  if (!locationsWindow) {
    locationsWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 1100,
      height: 600,
      title: `Mercado 1990 - Ubicaciones`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: stockWindow,
      modal: true,
      resizable: false,
      frame: false,
    });

    // Load index.hbs into the new BrowserWindow
    locationsWindow.loadFile(
      historyHandlebars.render("/stock/locations.hbs", { store, exposition })
    );

    handleErrors(locationsWindow);

    // Listen for window being closed
    locationsWindow.on("closed", () => {
      locationsWindow.removeAllListeners();
      locationsWindow = null;
    });
  } else return null;
}

function createCustomersWindow({ customers }) {
  if (!customersWindow) {
    const actualDate = new Date();
    const date = `${actualDate.getDate()}/${
      actualDate.getMonth() + 1
    }/${actualDate.getFullYear()}`;

    customersWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 1500,
      height: 1000,
      title: `Mercado 1990 - Clientes / Cuentas Corrientes - ${date}`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: mainWindow,
      resizable: false,
      modal: true,
      frame: false,
    });

    // Load index.hbs into the new BrowserWindow
    customersWindow.loadFile(
      historyHandlebars.render("/customers/customers.hbs", { customers })
    );

    handleErrors(customersWindow);

    // Listen for window being closed
    customersWindow.on("closed", () => {
      customersWindow.removeAllListeners();
      customersWindow = null;
    });
  } else return null;
}

function createAddCustomerWindow({ provinces, docTypes }) {
  if (!addCustomerWindow) {
    addCustomerWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 650,
      height: 705,
      title: `Mercado 1990 - Clientes - Agregar`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: customersWindow,
      resizable: false,
      modal: true,
      frame: false,
    });

    // Load index.hbs into the new BrowserWindow
    addCustomerWindow.loadFile(
      historyHandlebars.render("/customers/addCustomer.hbs", {
        docTypes,
        provinces,
      })
    );

    handleErrors(addCustomerWindow);

    // Listen for window being closed
    addCustomerWindow.on("closed", () => {
      addCustomerWindow.removeAllListeners();
      addCustomerWindow = null;
    });
  } else return null;
}

function createEditCustomerWindow({ provinces, docTypes }) {
  if (!editCustomerWindow) {
    editCustomerWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 650,
      height: 705,
      title: `Mercado 1990 - Clientes - Agregar`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: customersWindow,
      modal: true,
      resizable: false,
      frame: false,
    });

    // Load index.hbs into the new BrowserWindow
    editCustomerWindow.loadFile(
      historyHandlebars.render("/customers/editCustomer.hbs", {
        provinces,
        docTypes,
      })
    );

    handleErrors(editCustomerWindow);

    // Listen for window being closed
    editCustomerWindow.on("closed", () => {
      editCustomerWindow.removeAllListeners();
      editCustomerWindow = null;
    });
  } else return null;
}

function createDeleteCustomerWindow() {
  if (!deleteCustomerWindow) {
    deleteCustomerWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 400,
      height: 358,
      title: `Mercado 1990 - Clientes - Agregar`,
      backgroundColor: "F7F7F7",
      resizable: false,
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: customersWindow,
      modal: true,
      resizable: false,
      frame: false,
    });

    // Load index.hbs into the new BrowserWindow
    deleteCustomerWindow.loadFile(
      historyHandlebars.render("/customers/deleteCustomer.hbs")
    );

    handleErrors(deleteCustomerWindow);

    // Listen for window being closed
    deleteCustomerWindow.on("closed", () => {
      deleteCustomerWindow.removeAllListeners();
      deleteCustomerWindow = null;
    });
  } else return null;
}

function createPayDebtsWindow({ idCustomer }) {
  if (!payDebtsWindow) {
    payDebtsWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 800,
      height: 600,
      title: "Mercado 1990 ",
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: listDebtsWindow,
      modal: true,
      resizable: false,
      frame: false,
    });
    // Load index.hbs into the new BrowserWindow
    payDebtsWindow.loadFile(
      historyHandlebars.render(`customers/payDebt.hbs`, { idCustomer })
    );

    handleErrors(payDebtsWindow);

    // Listen for window being closed
    payDebtsWindow.on("closed", () => {
      payDebtsWindow.removeAllListeners();
      payDebtsWindow = null;
    });
  } else return null;
}

function createListDebtsWindow() {
  if (!listDebtsWindow) {
    listDebtsWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 1300,
      height: 1000,
      title: `Mercado 1990 - Lista de Deudas`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: customersWindow,
      modal: true,
      resizable: false,
      frame: false,
    });

    // Load index.hbs into the new BrowserWindow
    listDebtsWindow.loadFile(
      historyHandlebars.render("/customers/listDebts.hbs")
    );

    handleErrors(listDebtsWindow);

    // Listen for window being closed
    listDebtsWindow.on("closed", () => {
      listDebtsWindow.removeAllListeners();
      listDebtsWindow = null;
    });
  } else return null;
}

function createFirstTimeWindow() {
  if (!firstTimeWindow) {
    firstTimeWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 800,
      height: 400,
      title: `Mercado 1990 - Configuración Inicial`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      resizable: false,
    });

    firstTimeWindow.loadFile(`${__dirname}/renderer/html/firstTime.html`);

    handleErrors(firstTimeWindow);

    // Listen for window being closed
    firstTimeWindow.on("closed", () => {
      firstTimeWindow.removeAllListeners();
      firstTimeWindow = null;
    });
  } else return null;
}

function createCashFlowHistoryWindow({ cashFlow }) {
  if (!cashFlowHistoryWindow) {
    cashFlowHistoryWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 1000,
      height: 700,
      title: `Mercado 1990 - Flujo de Efectivo / Historial`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: mainWindow,
      modal: true,
      resizable: false,
      frame: false,
    });

    cashFlowHistoryWindow.loadFile(
      historyHandlebars.render(`cashRegister/history.hbs`, { cashFlow })
    );

    handleErrors(cashFlowHistoryWindow);

    // Listen for window being closed
    cashFlowHistoryWindow.on("closed", () => {
      cashFlowHistoryWindow.removeAllListeners();
      cashFlowHistoryWindow = null;
    });
  } else return null;
}

function createCashFlowInWindow() {
  if (!cashFlowInWindow) {
    cashFlowInWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 800,
      height: 400,
      title: `Mercado 1990 - Flujo de Efectivo / Ingreso`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: mainWindow,
      modal: true,
      resizable: false,
      frame: false,
    });

    cashFlowInWindow.loadFile(
      `${__dirname}/renderer/html/cashRegister/in.html`
    );

    handleErrors(cashFlowInWindow);

    // Listen for window being closed
    cashFlowInWindow.on("closed", () => {
      cashFlowInWindow.removeAllListeners();
      cashFlowInWindow = null;
    });
  } else return null;
}

function createCashFlowOutWindow() {
  if (!cashFlowOutWindow) {
    cashFlowOutWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 800,
      height: 400,
      title: `Mercado 1990 - Flujo de Efectivo / Egreso`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: mainWindow,
      modal: true,
      resizable: false,
      frame: false,
    });

    cashFlowOutWindow.loadFile(
      `${__dirname}/renderer/html/cashRegister/out.html`
    );

    handleErrors(cashFlowOutWindow);

    // Listen for window being closed
    cashFlowOutWindow.on("closed", () => {
      cashFlowOutWindow.removeAllListeners();
      cashFlowOutWindow = null;
    });
  } else return null;
}

function createGeneralMaintenanceWindow({ general }) {
  if (!generalMaintenanceWindow) {
    generalMaintenanceWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 600,
      height: 550,
      title: `Mercado 1990 - Configuración General`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: mainWindow,
      modal: true,
      resizable: false,
      frame: false,
    });

    generalMaintenanceWindow.loadFile(
      historyHandlebars.render(`maintenance/maintenance.hbs`, { general })
    );

    handleErrors(generalMaintenanceWindow);

    // Listen for window being closed
    generalMaintenanceWindow.on("closed", () => {
      generalMaintenanceWindow.removeAllListeners();
      generalMaintenanceWindow = null;
    });
  } else return null;
}

function createBranchesMaintenanceWindow({ branches, branch }) {
  if (!branchesMaintenanceWindow) {
    branchesMaintenanceWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 650,
      height: 750,
      title: `Mercado 1990 - Configuración General`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: mainWindow,
      modal: true,
      resizable: false,
      frame: false,
    });

    branchesMaintenanceWindow.loadFile(
      historyHandlebars.render(`maintenance/branch.hbs`, {
        branches,
        branchName: branch.name,
        branchId: branch.id,
      })
    );

    handleErrors(branchesMaintenanceWindow);
    // Listen for window being closed
    branchesMaintenanceWindow.on("closed", () => {
      branchesMaintenanceWindow.removeAllListeners();
      branchesMaintenanceWindow = null;
    });
  } else return null;
}

function createEmployeesWindow({ employees }) {
  if (employeesWindow) {
    employeesWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 1100,
      height: 900,
      title: `Mercado 1990 - Empleados`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: mainWindow,
      modal: true,
      resizable: false,
      frame: false,
    });

    // Load index.hbs into the new BrowserWindow
    employeesWindow.loadFile(
      historyHandlebars.render("/maintenance/employees.hbs", { employees })
    );

    handleErrors(employeesWindow);

    // Listen for window being closed
    employeesWindow.on("closed", () => {
      employeesWindow.removeAllListeners();
      employeesWindow = null;
    });
  } else return null;
}

function createAddEmplooyWindow({ docTypes }) {
  if (!addEmployeesWindow) {
    addEmployeesWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 700,
      height: 1000,
      title: `Mercado 1990- Empleados- Agregar`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: employeesWindow,
      modal: true,
      resizable: false,
      frame: false,
    });

    // Load index.hbs into the new BrowserWindow
    addEmployeesWindow.loadFile(
      historyHandlebars.render("/maintenance/addEmployees.hbs", { docTypes })
    );

    handleErrors(addEmployeesWindow);

    // Listen for window being closed
    addEmployeesWindow.on("closed", () => {
      addEmployeesWindow.removeAllListeners();
      addEmployeesWindow = null;
    });
  } else return null;
}

function createEditEmplooyWindow({ emplooy, docTypes }) {
  if (!editEmployeesWindow) {
    editEmployeesWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 700,
      height: 1000,
      title: `Mercado 1990- Empleados- Editar`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: employeesWindow,
      modal: true,
      resizable: false,
      frame: false,
    });

    // Load index.hbs into the new BrowserWindow
    editEmployeesWindow.loadFile(
      historyHandlebars.render("/maintenance/editEmployees.hbs", {
        docTypes,
        emplooy,
      })
    );

    handleErrors(editEmployeesWindow);

    // Listen for window being closed
    editEmployeesWindow.on("closed", () => {
      editEmployeesWindow.removeAllListeners();
      editEmployeesWindow = null;
    });
  } else return null;
}

function createUsersWindow({ users }) {
  if (!usersWindow) {
    usersWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 1100,
      height: 900,
      title: `Mercado 1990 - Usuarios`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: mainWindow,
      modal: true,
      resizable: false,
      frame: false,
    });

    // Load index.hbs into the new BrowserWindow
    usersWindow.loadFile(
      historyHandlebars.render("/maintenance/users.hbs", { users })
    );

    handleErrors(usersWindow);

    // Listen for window being closed
    usersWindow.on("closed", () => {
      usersWindow.removeAllListeners();
      usersWindow = null;
    });
  } else return null;
}

function createAddUserWindow({ employees, branches }) {
  if (!addUserWindow) {
    addUserWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 750,
      height: 900,
      title: `Mercado 1990 - Usuarios - Agregar`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: usersWindow,
      modal: true,
      resizable: false,
      frame: false,
    });

    // Load index.hbs into the new BrowserWindow
    addUserWindow.loadFile(
      historyHandlebars.render("/maintenance/addUser.hbs", {
        employees,
        branches,
      })
    );

    handleErrors(addUserWindow);

    // Listen for window being closed
    addUserWindow.on("closed", () => {
      addUserWindow.removeAllListeners();
      addUserWindow = null;
    });
  } else return null;
}

function createEditUserWindow({ user, emplooy, branches }) {
  if (!editUserWindow) {
    editUserWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 750,
      height: 900,
      title: `Mercado 1990 - Usuarios - Agregar`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: usersWindow,
      modal: true,
      resizable: false,
      frame: false,
    });

    // Load index.hbs into the new BrowserWindow
    editUserWindow.loadFile(
      historyHandlebars.render("/maintenance/editUser.hbs", {
        user,
        emplooy,
        branches,
      })
    );

    handleErrors(editUserWindow);

    // Listen for window being closed
    editUserWindow.on("closed", () => {
      editUserWindow.removeAllListeners();
      editUserWindow = null;
    });
  } else return null;
}

function createDocsWindow({ docTypes }) {
  if (!docsWindow) {
    docsWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 1000,
      height: 600,
      title: `Mercado 1990 - Tipos de Documentos`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: mainWindow,
      modal: true,
      resizable: false,
      frame: false,
    });

    // Load index.hbs into the new BrowserWindow
    docsWindow.loadFile(
      historyHandlebars.render("/maintenance/docs.hbs", { docTypes })
    );

    handleErrors(docsWindow);

    // Listen for window being closed
    docsWindow.on("closed", () => {
      docsWindow.removeAllListeners();
      docsWindow = null;
    });
  } else return null;
}

function createUnitsWindow({ measures }) {
  if (!unitsWindow) {
    unitsWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 1000,
      height: 600,
      title: `Mercado 1990 - Unidades de Medida`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: mainWindow,
      modal: true,
      resizable: false,
      frame: false,
    });

    // Load index.hbs into the new BrowserWindow
    unitsWindow.loadFile(
      historyHandlebars.render("/maintenance/units.hbs", { measures })
    );

    handleErrors(unitsWindow);

    // Listen for window being closed
    unitsWindow.on("closed", () => {
      unitsWindow.removeAllListeners();
      unitsWindow = null;
    });
  } else return null;
}

function createSalesWindow({ sales }) {
  if (!salesWindow) {
    salesWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 1500,
      height: 1000,
      title: `Mercado 1990 - Ofertas`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: mainWindow,
      modal: true,
      resizable: false,
      frame: false,
    });

    // Load index.hbs into the new BrowserWindow
    salesWindow.loadFile(
      historyHandlebars.render("/sells/sales.hbs", { sales })
    );

    handleErrors(salesWindow);

    // Listen for window being closed
    salesWindow.on("closed", () => {
      salesWindow.removeAllListeners();
      salesWindow = null;
    });
  } else return null;
}

function createAddSaleWindow() {
  if (!addSaleWindow) {
    addSaleWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 1150,
      height: 450,
      title: `Mercado 1990 - Ofertas - Agregar`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: salesWindow,
      modal: true,
      resizable: false,
      frame: false,
    });

    // Load index.hbs into the new BrowserWindow
    addSaleWindow.loadFile(`${__dirname}/renderer/html/sells/addSale.html`);

    handleErrors(addSaleWindow);

    // Listen for window being closed
    addSaleWindow.on("closed", () => {
      addSaleWindow.removeAllListeners();
      addSaleWindow = null;
    });
  } else return null;
}

function createMissingStockWindow({ missing }) {
  if (!missingStockWindow) {
    missingStockWindow = new BrowserWindow({
      icon: `${__dirname}/renderer/images/favicon.png`,
      width: 1200,
      height: 700,
      title: `Mercado 1990 - Flujo de Efectivo / Historial`,
      backgroundColor: "F7F7F7",
      webPreferences: {
        nodeIntegration: false,
        preload: `${__dirname}/preload.js`,
        contextIsolation: true,
      },
      parent: mainWindow,
      modal: false,
      resizable: false,
      frame: false,
    });

    missingStockWindow.loadFile(
      historyHandlebars.render(`stock/missing.hbs`, { missing })
    );

    handleErrors(missingStockWindow);

    // Listen for window being closed
    missingStockWindow.on("closed", () => {
      missingStockWindow.removeAllListeners();
      missingStockWindow = null;
    });
  } else return null;
}

function returnMainWindow() {
  return mainWindow;
}

function returnLoginWindow() {
  return loginWindow;
}

function returnSettingsWindow() {
  return settingsWindow;
}

function returnSellsHistoryWindow() {
  return sellsHistoryWindow;
}

function returnPaymentWindow() {
  return paymentWindow;
}

function returnSearchProductsWindow() {
  return searchProductsWindow;
}

function returnCustomerListWindow() {
  return customerListWindow;
}

function returnOrdersWindow() {
  return ordersWindow;
}

function returnSuppliersWindow() {
  return suppliersWindow;
}

function returnSuppliersEditWindow() {
  return suppliersEditWindow;
}

function returnSuppliersAddWindow() {
  return suppliersAddWindow;
}

function returnBuysWindow() {
  return buysWindow;
}

function returnAddBuyWindow() {
  return addBuyWindow;
}

function returnSearchProductsBuysWindow() {
  return searchProductsBuysWindow;
}

function returnStockWindow() {
  return stockWindow;
}

function returnAddProductWindow() {
  return addProductWindow;
}

function returnEditProductWindow() {
  return editProductWindow;
}

function returnDeleteProductWindow() {
  return deleteProductWindow;
}

function returnDepartmentsWindow() {
  return departmentsWindow;
}

function returnCustomersWindow() {
  return customersWindow;
}

function returnAddCustomerWindow() {
  return addCustomerWindow;
}

function returnEditCustomerWindow() {
  return editCustomerWindow;
}

function returnDeleteCustomerWindow() {
  return deleteCustomerWindow;
}

function returnPayDebtsWindow() {
  return payDebtsWindow;
}

function returnListDebtsWindow() {
  return listDebtsWindow;
}

function returnFirstTimeWindow() {
  return firstTimeWindow;
}

function returnCashFlowHistoryWindow() {
  return cashFlowHistoryWindow;
}

function returnCashFlowInWindow() {
  return cashFlowInWindow;
}

function returnCashFlowOutWindow() {
  return cashFlowOutWindow;
}

function returnGeneralMaintenanceWindow() {
  return generalMaintenanceWindow;
}

function returnBrancesMaintenanceWindow() {
  return branchesMaintenanceWindow;
}

function returnEmployeesWindow() {
  return employeesWindow;
}

function returnAddEmployeesWindow() {
  return addEmployeesWindow;
}

function returnEditEmployeesWindow() {
  return editEmployeesWindow;
}

function returnUsersWindow() {
  return usersWindow;
}

function returnAddUserWindow() {
  return addUserWindow;
}

function returnEditUserWindow() {
  return editUserWindow;
}

function returnUnitsWindow() {
  return unitsWindow;
}

function returnDocsWindow() {
  return docsWindow;
}

function returnSalesWindow() {
  return salesWindow;
}

function returnAddSaleWindow() {
  return addSaleWindow;
}

function returnMissingStockWindow() {
  return missingStockWindow;
}

function returnPayOrdersWindow() {
  return payOrdersWindow;
}

function returnLocationsWindow() {
  return locationsWindow;
}

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
  createFirstTimeWindow,
  createCashFlowHistoryWindow,
  createCashFlowInWindow,
  createCashFlowOutWindow,
  createGeneralMaintenanceWindow,
  createBranchesMaintenanceWindow,
  createEmployeesWindow,
  createAddEmplooyWindow,
  createEditEmplooyWindow,
  createUsersWindow,
  createAddUserWindow,
  createEditUserWindow,
  createDocsWindow,
  createUnitsWindow,
  createSalesWindow,
  createAddSaleWindow,
  createMissingStockWindow,
  createPayOrderWindow,
  createLocationsWindow,
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
  returnBuysWindow,
  returnAddBuyWindow,
  returnSearchProductsBuysWindow,
  returnStockWindow,
  returnAddProductWindow,
  returnEditProductWindow,
  returnDeleteProductWindow,
  returnDepartmentsWindow,
  returnCustomersWindow,
  returnAddCustomerWindow,
  returnEditCustomerWindow,
  returnDeleteCustomerWindow,
  returnPayDebtsWindow,
  returnListDebtsWindow,
  returnFirstTimeWindow,
  returnCashFlowHistoryWindow,
  returnCashFlowInWindow,
  returnCashFlowOutWindow,
  returnGeneralMaintenanceWindow,
  returnBrancesMaintenanceWindow,
  returnEmployeesWindow,
  returnAddEmployeesWindow,
  returnEditEmployeesWindow,
  returnUsersWindow,
  returnEditUserWindow,
  returnAddUserWindow,
  returnDocsWindow,
  returnUnitsWindow,
  returnSalesWindow,
  returnAddSaleWindow,
  returnMissingStockWindow,
  returnPayOrdersWindow,
  returnLocationsWindow,
  mainHandlebars,
  historyHandlebars,
};
