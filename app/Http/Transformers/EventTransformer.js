/**
 * Transform event to a proper response object
 *
 * @param event {Event}
 *
 * @returns {{
 *     id:          {String},
 *     title:       {String},
 *     description: {String},
 *     postedAt:    {Number},
 *     createdAt:   {Number},
 *     updatedAt:   {Number},
 * }}
 */
const make = (event) => {
    return {
        id         : event._id,
        title      : event.title,
        description: event.description,
        postedAt   : event.postedAt,
        createdAt  : event.createdAt,
        updatedAt  : event.updatedAt,
    };
};

/**
 * Transform a collection of event to a proper response event array
 *
 * @param events {Array}
 *
 * @returns {Array}
 */
const collection = (events) => {
    const transformed = [];

    events.forEach(event => {
        transformed.push(make(event));
    });

    return transformed;
};

module.exports = {
    make,
    collection,
};
