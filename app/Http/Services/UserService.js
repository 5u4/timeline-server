const bcrypt     = require('bcrypt');
const User       = require('../../Models/User');
const authConfig = require('../../../configs/auth');

/**
 * create a user and insert into database
 *
 * @param username {String} the unique username
 * @param password {String} the password that is not been hashed
 *
 * @returns {Promise<any>}
 *
 * @example resolve {Object} the user just created
 *
 * @example reject {String} the error occurred during creating user
 */
const createUser = (username, password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, authConfig.saltRounds, (err, hashedPassword) => {
            if (err) {
                // TODO: password hash error handling
                reject(err);
            }

            const user = new User({
                username: username,
                password: hashedPassword,
            });

            user.save((err) => {
                if (err) {
                    // TODO: store db error handling
                    reject(err);
                }
            });

            resolve(user);
        });
    });
};

module.exports = {
    createUser,
};
