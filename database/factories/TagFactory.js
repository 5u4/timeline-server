const faker = require('faker');
const Tag   = require('../../app/Models/Tag').model;
const User  = require('../../app/Models/User');

/**
 * Build a tag
 *
 * @param {String} name         The namt of the tag
 * @param {String} description  The description, default null
 * @param {Number} color        The color of the tag
 *
 * @returns {Tag}
 */
const make = async function(name = null, description = null, color = null) {
    if (!name) {
        name = faker.hacker.noun;
    }

    if (!description) {
        description = faker.lorem.sentence;
    }

    if (!color) {
        color = faker.commerce.color;
    }

    const tag = new Tag({
        name: name,
        description: description,
        color: color,
    });

    return tag;
};

/**
 * Build a tag and save it to the database
 * 
 * @param {String} userId       The user that owns the tag
 * @param {String} name         The namt of the tag
 * @param {String} description  The description, default null
 * @param {Number} color        The color of the tag
 *
 * @returns {Tag}
 */
const create = async function(userId, name = null, description = null, color = null) {
    const tag = await make(name, description, color);

    await User.findByIdAndUpdate(userId, {$push: {tags: tag}});

    return tag;
};

module.exports = {
    make,
    create,
};
