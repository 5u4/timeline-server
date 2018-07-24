const Joi = require('joi');

/**
 * Store validation
 *
 * @type {{body: {title: *, description: *, postedAt: *, createdAt: *, updatedAt: *}}}
 */
const store = {
    body: {
        title: Joi.string()
            .min(1).max(72)
            .required(),

        description: Joi.string()
            .max(65536),

        postedAt: Joi.number()
            .positive()
            .integer(),

        createdAt: Joi.number()
            .positive()
            .integer(),

        updatedAt: Joi.number()
            .positive()
            .integer(),
    }
};

/**
 * Update validation
 */
const update = {
    params: {
        eventId: Joi.string()
            .required(),
    },

    body: {
        title: Joi.string()
            .min(1).max(72),

        description: Joi.string()
            .max(65536),

        postedAt: Joi.number()
            .positive()
            .integer(),
    }
};

const destroy = {
    params: {
        eventId: Joi.string()
            .required(),
    },
};

module.exports = {
    store,
    update,
    destroy,
};
