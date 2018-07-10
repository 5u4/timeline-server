const Joi = require('joi');

const login = {
    body: {
        username: Joi.string().required(),
        password: Joi.string().required(),
    }
};

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
