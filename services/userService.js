const bcrypt     = require('bcrypt');
const userModel  = require('../models/userModel');
const authConfig = require('../configs/auth');

const createUser = (username, password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, authConfig.saltRounds, (err, hashedPassword) => {
            if (err) {
                // TODO: password hash error handling
                reject(err);
            }

            const user = new userModel({
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
