const mongoose = require('../database/database');

const userSchema = new mongoose.Schema({
    username: {
        type: [String, 'Username should be a string type'],
        required: [true, 'Username is required'],
    },
    password: {
        type: [String, 'Password should be a string type'],
        required: [true, 'Password is required'],
    },
});

module.exports = mongoose.model('user', userSchema);
