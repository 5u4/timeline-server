const Joi = require('joi');

/**
 * Login Validator
 *
 * @type {{body: {username: *, password: *}}}
 */
const login = {
    body: {
        username: Joi.string()
            .min(5).max(20)
            .regex(/^[a-zA-Z][a-zA-Z0-9]*$/)
            .required(),

        password: Joi.string()
            .min(8).max(64)
            .required(),
    }
};

/**
 * Register Validator
 *
 * @type {{body: {username: *, password: *}}}
 */
const register = {
    body: {
        username: Joi.string()
            .min(5).max(20)
            .regex(/^[a-zA-Z][a-zA-Z0-9]*$/)
            .required(),

        password: Joi.string()
            .min(8).max(64)
            .required(),
    }
};

module.exports = {
    login,
    register,
};
