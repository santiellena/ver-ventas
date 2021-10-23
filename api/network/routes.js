const auth = require('../components/auth/network.js');
const { notFound } = require('../utils/errors.js');

module.exports = (app) => {
    app.use('/api/auth', auth);
    app.use(notFound);
};