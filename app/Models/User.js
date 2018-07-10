const mongoose = require('../../database/connection');

const User = new mongoose.Schema({
    username: String,
    password: String,
});

module.exports = mongoose.model('user', User);
