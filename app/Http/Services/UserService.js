const bcrypt     = require('bcrypt');
const User       = require('../../Models/User');
const authConfig = require('../../../configs/auth');

/**
 * Check if a username is been taken.
 *
 * @param {String} username The user name that is going to be test
 *
 * @returns {Boolean} If the username is been taken
 */
const isUsernameBeenTaken = async function(username) {
    return !!await User.findOne({username: username});
};

/**
 * Create a user and insert into database
 *
 * @param {String} username The unique username
 * @param {String} password The password that is not been hashed
 *
 * @returns {User} The newly created user
 */
const createUser = async function(username, password) {
    const hashedPassword = await bcrypt.hash(password, authConfig.saltRounds);

    const user = new User({
        username: username,
        password: hashedPassword,
    });

    await user.save();

    return user;
};

module.exports = {
    isUsernameBeenTaken,
    createUser,
};
