const bcrypt     = require('bcrypt');
const User       = require('../../Models/User');
const authConfig = require('../../../configs/auth');

/**
 * Check if a username is been taken.
 *
 * @param username {String} the user name that is going to be test
 *
 * @returns {Promise<any>}
 *
 * @example resolve {Boolean} true if user exits, else false
 */
const isUsernameBeenTaken = (username) => {
    return new Promise((resolve, reject) => {
        User.findOne({
            username: username,
        }, (err, user) => {
            resolve(!!user);
        });
    });
};

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
                reject(err);
            }

            const user = new User({
                username: username,
                password: hashedPassword,
            });

            user.save((err) => {
                if (err) {
                    reject(err);
                }
            });

            resolve(user);
        });
    });
};

module.exports = {
    isUsernameBeenTaken,
    createUser,
};
