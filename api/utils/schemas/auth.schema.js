const joi = require('joi');

const username = joi.string().max(15);
const password = joi.string().max(15);
const token = joi.string();

const loginSchema = joi.object({
    username: username.required(),
    password: password.required(),
    token: token.required(),
});

module.exports = {
    loginSchema,
}