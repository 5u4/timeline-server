const Joi = require('joi');

/**
 * Store validation
 *
 * @type {{body: {title: *, description: *, postedAt: *, createdAt: *, updatedAt: *}}}
 */
const store = {
    body: {
        name: Joi.string()
            .min(1).max(72)
            .required(),

        description: Joi.string()
            .max(65536),

        color: Joi.string()
            .hex(),

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
        tagId: Joi.string()
            .required(),
    },

    body: {
        name: Joi.string()
            .min(1).max(72),

        description: Joi.string()
            .max(65536),

        color: Joi.string()
            .hex(),
    }
};

const destroy = {
    params: {
        tagId: Joi.string()
            .required(),
    },
};

module.exports = {
    store,
    update,
    destroy,
};
