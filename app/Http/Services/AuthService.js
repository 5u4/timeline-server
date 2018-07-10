const jwt       = require('jsonwebtoken');
const bcrypt    = require('bcrypt');
const jwtConfig = require('../../../configs/jwt');
const User      = require('../../Models/User');

/**
 * check if the username and the password matches
 *
 * @param username {String} the unique username
 * @param password {String} the password without been hashed
 *
 * @returns {Promise<any>}
 *
 * @example resolve {Object} {
 *     success: {Boolean} if the credential is correct,
 *     user   : {Object}  the user object,
 * }
 *
 * @example reject {String} the error occurred during checking
 */
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

/**
 * get a user's json web token
 * set the expire time at /configs/jwt.expiresIn
 *
 * @param user {Object} the user object
 *
 * @returns {Promise<any>}
 *
 * @example resolve {String} the json web token
 *
 * @example reject {String} the error occurred during signing token
 */
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
