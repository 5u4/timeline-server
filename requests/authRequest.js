const Joi = require('joi');

const loginRequest = {
    body: {
        username: Joi.string().required(),
        password: Joi.string().required(),
    }
};

const registerRequest = {
    body: {
        username: Joi.string().required(),
        password: Joi.string().required(),
    }
};

module.exports = {
    loginRequest,
    registerRequest,
};
