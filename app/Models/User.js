const mongoose  = require('mongoose');
const TagSchema = require('./Tag').schema;

/**
 * @property {String} username
 * @property {String} password
 * @property {Array}  events
 * @property {Array}  tags
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

    events: {
        type: Array,
        default: [],
        required: false,
    },

    tags: {
        type: [TagSchema],
        default: [],
        required: false,
    },
});

module.exports = mongoose.model('user', User);
