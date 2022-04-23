const store = require('./store');
const boom = require('@hapi/boom');

const dump = async () => {
    return await store.dump();
};

module.exports = {
    dump,
};