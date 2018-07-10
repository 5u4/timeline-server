const jwt       = require('jsonwebtoken');
const bcrypt    = require('bcrypt');
const jwtConfig = require('../../../configs/jwt');
const User      = require('../../Models/User');

const credentialCheck = (username, password) => {
    return new Promise((resolve, reject) => {
        User.findOne({
            username: username,
        }, (err, user) => {
            if (err) {
                // TODO: get user error handling
                reject(err);
            }

            bcrypt.compare(password, user.password, (err, isEqual) => {
                if (err) {
                    // TODO: wrong password handling
                    reject(err);
                }

                resolve({
                    success: isEqual,
                    user: user,
                });
            });
        });
    });
};

const getAuthToken = (user) => {
    return new Promise((resolve, reject) => {
        jwt.sign(user.toJSON(), jwtConfig.jwtsecret, {
            expiresIn: jwtConfig.expiresIn,
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
