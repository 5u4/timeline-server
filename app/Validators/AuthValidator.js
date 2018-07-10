const Joi = require('joi');

/**
 * Login Validator
 *
 * @type {{body: {username: *, password: *}}}
 */
const login = {
    body: {
        username: Joi.string().required(),
        password: Joi.string().required(),
    }
};

/**
 * Register Validator
 *
 * @type {{body: {username: *, password: *}}}
 */
const register = {
    body: {
        username: Joi.string().required(),
        password: Joi.string().required(),
    }
};

module.exports = {
    login,
    register,
};
