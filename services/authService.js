const bcrypt    = require('bcrypt');
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

            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    // TODO: wrong password handling
                    reject(err);
                }

                resolve(result);
            });
        });
    });
};

module.exports = {
    credentialCheck
};
