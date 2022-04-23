const auth = require('../components/auth/network');
const global = require('../components/global/network');
const branches = require('../components/branches/network');
const docTypes = require('../components/docTypes/network');
const unitMeasures = require('../components/unitMeasures/network');
const departments = require('../components/departments/network');
const cashRegisters = require('../components/cashRegister/network');
const employees = require('../components/employees/network');
const userTypes = require('../components/userTypes/network');
const locationStore = require('../components/locationStore/network');
const locationExposition = require('../components/locationExposition/network');
const customers = require('../components/customers/network');
const suppliers = require('../components/suppliers/network');
const products = require('../components/products/network');
const buys = require('../components/buys/network');
const cashFlows = require('../components/cashFlow/network');
const debtPaids = require('../components/debtsPaid/network');
const orders = require('../components/orders/network');
const sales = require('../components/sales/network');
const sells = require('../components/sells/network');
const dumps = require('../components/dumps/network');
const { notFound } = require('../utils/errors');

module.exports = (app) => {
    app.use('/api/auth', auth);
    app.use('/api/global', global);
    app.use('/api/branch', branches);
    app.use('/api/doc-type', docTypes)
    app.use('/api/unit-measure', unitMeasures);
    app.use('/api/department', departments);
    app.use('/api/cash-register', cashRegisters);
    app.use('/api/emplooy', employees);
    app.use('/api/user-type', userTypes);
    app.use('/api/location/store', locationStore);
    app.use('/api/location/exposition', locationExposition);
    app.use('/api/customer', customers);
    app.use('/api/supplier', suppliers);
    app.use('/api/product', products);
    app.use('/api/buy', buys);
    app.use('/api/cash-flow', cashFlows);
    app.use('/api/debt-payment', debtPaids);
    app.use('/api/order', orders);
    app.use('/api/sale', sales);
    app.use('/api/sell', sells);
    app.use('/api/dump', dumps);
    app.use(notFound);
};