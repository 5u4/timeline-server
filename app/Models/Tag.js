const mongoose = require('mongoose');

/**
 * @property name        {String}
 * @property description {String}
 * @property color       {String}
 */
const Tag = new mongoose.Schema({
    name: {
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

    color: {
        type: String,
        required: false,
    },
});

module.exports = {
    model: mongoose.model('tag', Tag),
    schema: Tag,
};
