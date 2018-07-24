const jwt       = require('jsonwebtoken');
const bcrypt    = require('bcrypt');
const jwtConfig = require('../../../configs/jwt');
const User      = require('../../Models/User');

/**
 * Check if the username and the password matches
 *
 * @param {String} username The unique username
 * @param {String} password The password without been hashed
 *
 * @returns {Boolean} Is correct credential
 */
const isCorrectCredential = async function(username, password) {
    const user = await User.findOne({username: username});
    
    if (!user) {
        return false;
    }

    return await bcrypt.compare(password, user.password);
};

/**
 * Get a user's json web token
 * 
 * Expire time can be set at /configs/jwt.expiresIn
 *
 * @param {String} userId The user that is going to be sign to a token
 *
 * @returns {String} The auth token
 */
const getAuthToken = async function(userId) {
    return jwt.sign({id: userId}, jwtConfig.jwtsecret, {
        expiresIn: jwtConfig.expiresIn
    });
};

module.exports = {
    isCorrectCredential,
    getAuthToken,
};
