const jwt       = require('jsonwebtoken');
const bcrypt    = require('bcrypt');
const jwtConfig = require('../configs/jwt');
const userModel = require('../models/userModel');

const credentialCheck = (username, password) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({
            username: username,
        }, (err, user) => {
            if (err) {
                // TODO: get user error handling
                reject(err);
            }

            bcrypt.compare(password, user.password, (err, success) => {
                if (err) {
                    // TODO: wrong password handling
                    reject(err);
                }

                resolve({
                    success: success,
                    user: user,
                });
            });
        });
    });
};

const getAuthToken = (user) => {
    return new Promise((resolve, reject) => {
        jwt.sign(user.toJSON(), jwtConfig.jwtsecret, {
            expiresIn: 60 * 60 * 24,
        }, (err, token) => {
            if (err) {
                // TODO: jwt auth token sign error handle
                reject(err);
            }

            resolve(token);
        });
    });
};

module.exports = {
    credentialCheck,
    getAuthToken,
};
