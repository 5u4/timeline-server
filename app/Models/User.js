const mongoose = require('../../database/connection');

/**
 * @property username {String}
 * @property password {String}
 */
const User = new mongoose.Schema({
    username: String,
    password: String,
});

module.exports = mongoose.model('user', User);
