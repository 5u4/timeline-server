const mongoose = require('mongoose');

/**
 * @property username {String}
 * @property password {String}
 */
const Event = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 1,
        max: 72,
    },

    description: {
        type: String,
        default: null,
        required: false,
        max: 65536,
    },

    postedAt: {
        type: Number,
        default: new Date(),
        required: true,
    },

    createdAt: {
        type: Number,
        default: new Date(),
        required: true,
    },

    updatedAt: {
        type: Number,
        default: null,
        required: true,
    },
});

module.exports = mongoose.model('event', Event);
