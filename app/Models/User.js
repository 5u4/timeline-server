const mongoose = require('../../database/connection');

/**
 * @property username {String}
 * @property password {String}
 */
const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 5,
        max: 20,
        regex: /^[a-zA-Z][a-zA-Z0-9_.]*$/,
    },

    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('user', User);
