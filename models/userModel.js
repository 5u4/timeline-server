const mongoose = require('../database/database');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

module.exports = mongoose.model('user', userSchema);
