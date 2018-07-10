const bcrypt     = require('bcrypt');
const User       = require('../../Models/User');
const authConfig = require('../../../configs/auth');

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
