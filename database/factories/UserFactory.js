const faker  = require('faker');
const User   = require('../../app/Models/User');
const bcrypt = require('bcrypt');

/**
 * Build a user
 *
 * @param username {String}
 * @param password {String}
 *
 * @returns {Promise<any>}
 *
 * @example resolve {User}
 */
const make = (username = null, password = 'test_password') => {
    if (!username) {
        username = faker.name.firstName;
    }

    return new Promise(resolve => {
        bcrypt.hash(password, require('../../configs/auth').saltRounds, (err, hashedPassword) => {
            const user = new User({
                username: username,
                password: hashedPassword,
            });

            resolve(user);
        });
    });
};

/**
 * Build a user and save it to the database
 *
 * @param username {String}
 * @param password {String}
 *
 * @returns {Promise<any>}
 *
 * @example resolve {User}
 */
const create = (username = null, password = 'test_password') => {
    if (!username) {
        username = faker.name.firstName;
    }

    return new Promise(resolve => {
        make(username, password).then(user => {
            user.save();
            resolve(user);
        });
    });
};

module.exports = {
    make,
    create,
};
