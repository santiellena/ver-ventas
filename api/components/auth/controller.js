const auth = require('../../auth/index');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const store = require('./store');

const login = (username, password) => {
    const userData = await store.getUser(username);
};

module.exports = {
    login,
}