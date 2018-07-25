/**
 * Transform tag to a proper response object
 *
 * @param tag {Tag}
 *
 * @returns {Object} 
 * {
 *     id:          {String},
 *     name:        {String},
 *     description: {String},
 *     color:       {String},
 * }
 */
const make = (tag) => {
    return {
        id         : tag._id,
        name       : tag.name,
        description: tag.description,
        color      : tag.color,
    };
};

/**
 * Transform a collection of tags to a proper response tag array
 *
 * @param tags {Array}
 *
 * @returns {Array}
 */
const collection = (tags) => {
    const transformed = [];

    tags.forEach(tag => {
        transformed.push(make(tag));
    });

    return transformed;
};

module.exports = {
    make,
    collection,
};
