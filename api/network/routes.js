const auth = require('../components/auth/network');
const global = require('../components/global/network');
const branches = require('../components/branches/network');
const docTypes = require('../components/docTypes/network');
const unitMeasures = require('../components/unitMeasures/network');
const departments = require('../components/departments/network');
const cashRegisters = require('../components/cashRegister/network');
const employees = require('../components/employees/network');
const userTypes = require('../components/userTypes/network');
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
    app.use(notFound);
};