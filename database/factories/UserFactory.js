const faker  = require('faker');
const User   = require('../../app/Models/User');
const bcrypt = require('bcrypt');

/**
 * Build a user
 *
 * @param {String} username
 * @param {String} password 
 *
 * @returns {User} The newly created user
 */
const make = async function(username = null, password = 'test_password') {
    if (!username) {
        username = faker.name.firstName;
    }

    const hashedPassword = await bcrypt.hash(password, require('../../configs/auth').saltRounds);

    return new User({
        username: username,
        password: hashedPassword,
    });
};

/**
 * Build a user and save it to the database
 *
 * @param {String} username
 * @param {String} password
 *
 * @returns {User} The stored user
 */
const create = async function(username = null, password = 'test_password') {
    if (!username) {
        username = faker.name.firstName;
    }

    const user = await make(username, password);

    await user.save();

    return user;
};

module.exports = {
    make,
    create,
};
